import { createServerFn } from "@tanstack/react-start";

type Input = { page: string; reference: string; notes?: string };

const isImage = (s: unknown) => typeof s === "string" && /^data:image\/(png|jpe?g|webp);base64,/.test(s) && s.length < 12_000_000;

export const compareDesign = createServerFn({ method: "POST" })
  .inputValidator((d: Input) => {
    if (!isImage(d?.page) || !isImage(d?.reference)) throw new Error("Please upload two PNG, JPG or WebP images (under ~8 MB each).");
    return { page: d.page, reference: d.reference, notes: (d.notes ?? "").slice(0, 2000) };
  })
  .handler(async ({ data }) => {
    const { streamResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    try {
      const stream = await streamResponse({
        model: "openai/gpt-6-astra",
        reasoning: { effort: "medium" },
        store: false,
        instructions:
          "You are a senior web designer. Image 1 is a screenshot of the user's website. Image 2 is a frame from the reference video they want to copy exactly. List every visible difference (layout, positions, sizes, colors, fonts, imagery, spacing, motion cues) and give a concrete fix for each, most important first. Use short markdown sections: '## Biggest differences', '## Fixes', '## Smaller details'. Be specific with positions and sizes.",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: `Compare these two.${data.notes ? ` Extra notes: ${data.notes}` : ""}` },
              { type: "input_image", image_url: data.page, detail: "high" },
              { type: "input_image", image_url: data.reference, detail: "high" },
            ],
          },
        ],
      });
      let text = "";
      for await (const ev of stream as AsyncIterable<{ type?: string; delta?: string }>) {
        if (ev.type === "response.output_text.delta" && ev.delta) text += ev.delta;
      }
      if (!text.trim()) return { ok: false as const, error: "The AI returned no answer. Try again with different images." };
      return { ok: true as const, text };
    } catch (e) {
      if (e instanceof GatewayError) {
        console.error("compareDesign", e.code, e.httpStatus);
        const msg = e.httpStatus === 402 ? "Out of AI credits — add more in Settings → Plans & credits." : e.httpStatus === 429 ? "Too many requests right now, please wait a minute." : "The AI couldn't analyse these images.";
        return { ok: false as const, error: msg };
      }
      throw e;
    }
  });

import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const client = new InferenceClient(process.env.HF_TOKEN);

async function generate() {
  try {
    const result = await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs:
        "A premium product displayed on a sleek black marble pedestal with dramatic cinematic lighting, soft shadows, luxury studio environment, glossy reflections, minimalist background, ultra-realistic, commercial product photography, 8K, HDR, sharp focus, premium advertising style.",
    });

    if (!fs.existsSync("images")) {
      fs.mkdirSync("images");
    }

    const buffer = Buffer.from(await result.arrayBuffer());

    fs.writeFileSync("images/product.png", buffer);

    console.log("Image saved...");

  } catch (error) {
    console.error(error);
  }
}

generate();
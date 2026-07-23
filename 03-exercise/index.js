import { ElevenLabsClient } from "elevenlabs";
import fs from "fs";
import "dotenv/config";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const audio = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
  text: "yeah That's amazing! Tell me more about it.",
});

const chunks = [];

for await (const chunk of audio) {
  chunks.push(chunk);
}

fs.writeFileSync("audio/output3.mp3", Buffer.concat(chunks));

console.log("audio Saved!");
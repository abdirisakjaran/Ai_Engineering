import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function streamText(prompt: string) {
  const stream = await openai.chat.completions.create({
    model: "openai/gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
    max_tokens: 500,
  });

  let fullResponse = "";

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content ?? "";

    process.stdout.write(content);
    fullResponse += content;
  }

  console.log("\n");

  return fullResponse;
}


const topic = "let's talk about Weather of Somalia";


console.log("\nGenerating Blog Outline...\n");

const outline = await streamText(`
Create a detailed blog outline about:

${topic}

Include:
- Title
- Introduction
- Main sections
`);


console.log("\nGenerating Summary...\n");

const summary = await streamText(`
Summarize this blog outline in exactly two sentences:

${outline}
`);

console.log("SUMMARY");

console.log(summary);
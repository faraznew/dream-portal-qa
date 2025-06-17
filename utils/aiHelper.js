import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config(); // load .env

export async function classifyDream(dreamName) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OpenAI API key. Did you forget to create a .env file?");
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Classify this dream as "Good" or "Bad": "${dreamName}". Respond with only one word: Good or Bad.`
        }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ OpenAI API error (${response.status}):`, errorText);
    throw new Error("OpenAI API request failed");
  }

  const data = await response.json();
  console.log("📥 OpenAI raw response:", JSON.stringify(data, null, 2));

  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error("OpenAI response was empty or malformed.");
  }

  return data.choices[0].message.content.trim();
}


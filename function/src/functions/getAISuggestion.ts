//https://disney-clone-portfolio.azurewebsites.net/api/getaisuggestion?term=action

import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import OpenAI from "openai";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAISuggestion(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const term = request.query.get("term");

  const completion = await openAI.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a digital video assistant working for services such as Netflix, Disney Plus & Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide an quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre.`,
      },
      {
        role: "user",
        content: `I like: ${term}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return {
    body: completion.choices[0].message.content || "No suggestions found",
  };
}

app.http("getAISuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getAISuggestion,
});
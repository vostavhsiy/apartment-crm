import { Injectable, Logger } from "@nestjs/common";
import { OpenAI } from "openai";

import { OPENAI_API_KEY, OPENAI_BASE_URL, OPENAI_MODEL } from "./ai.constants";

@Injectable()
export class AiService {
  private logger = new Logger(AiService.name, { timestamp: true });

  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      baseURL: OPENAI_BASE_URL,
    });
  }

  async ask(
    prompt: string | OpenAI.Chat.Completions.ChatCompletionContentPart[],
    role?: string,
  ) {
    try {
      const messages: OpenAI.ChatCompletionMessageParam[] = [
        { role: "system", content: role || "You are a helpful assistant." },
        { role: "user", content: prompt },
      ];

      const completion = await this.openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages,
      });

      const response: string | undefined =
        completion?.choices[0]?.message?.content;

      if (!response) return null;

      return this.extractJson(response);
    } catch (error) {
      return null;
    }
  }

  private extractJson(text: string) {
    try {
      const match = text.match(/```\w*\n([\s\S]*?)\n```/);
      if (match) {
        return JSON.parse(match[1].trim());
      }

      const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return JSON.parse(text);
    } catch (e) {
      return null;
    }
  }
}

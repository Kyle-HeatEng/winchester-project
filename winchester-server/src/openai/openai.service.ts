import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Success, createJsonValidator, success } from 'typechat';
export type Request = {
  typeName: string;
};
@Injectable()
export class OpenaiService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  private translate_system = (
    typeName: string,
    schema: string,
    context: string,
  ) => `
    You are a service that translates user requests into JSON objects of type "${typeName}:
    \`\`\`\n${schema}\`\`\`
    You are going to be interacting with a player and you will be given a context to work with:
    \`\`\`\n${context}\`\`\`
    The following is a user request:
    `;

  private translate_user = (request: string) => `
    """\n${request}\n"""\n
    The following is the user request translated into a JSON object with 2 spaces of indentation and no properties with the value undefined:
  `;

  private create_repair_prompt = (validationError: string) => `
  The JSON object is invalid for the following reason:
  """\n${validationError}\n"""
  The following is a revised JSON object:
  `;

  private generate_json = async (
    typeName: string,
    schema: string,
    context: string,
    request: string,
  ) => {
    const response = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: this.translate_system(typeName, schema, context),
        },
        { role: 'user', content: this.translate_user(request) },
      ],
      model: process.env.OPENAI_MODEL,
      temperature: 0.6,
    });
    return response.choices[0]?.message?.content;
  };

  public create_json_translator = async (
    typeName: string,
    schema: string,
    context: string,
    request: string,
    number_of_attempts: number,
  ) => {
    const validator = createJsonValidator(schema, typeName);
    while (true) {
      const response_text = await this.generate_json(
        typeName,
        schema,
        context,
        request,
      );
      const startIndex = response_text.indexOf('{');
      const endIndex = response_text.lastIndexOf('}');
      if (!(startIndex >= 0 && endIndex > startIndex)) {
        request += this.create_repair_prompt('{ must come before }');
        continue;
      }
      // const jsonText = responseText.slice(startIndex, endIndex + 1);
    }
  };
  public complete = async (prompt: string) =>
    ({
      success: true,
      data: 'test',
    }) as Success<string>;
}

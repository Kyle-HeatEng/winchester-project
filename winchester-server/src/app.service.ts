import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CharacterList, ChatConversation } from './openai/schema/Winchester';
import { Error, TypeChatLanguageModel, createJsonTranslator } from 'typechat';
import * as fs from 'fs';
import * as path from 'path';
import { OpenaiService } from './openai/openai.service';

@Injectable()
export class AppService {
  // private model = createLanguageModel(process.env);
  private model: TypeChatLanguageModel;
  constructor(openai_service: OpenaiService) {
    this.model = openai_service;
  }
  private schema = fs.readFileSync(
    path.join(__dirname, './openai/schema/Winchester.d.ts'),
    'utf8',
  );

  private createTranslator = (schema_name: string) =>
    createJsonTranslator(this.model, this.schema, schema_name);

  public getCharacterList = async () => {
    try {
      const response = await this.createTranslator('CharacterList').translate(
        'Generate 4 random characters, the description should demonstrate how the other characters are related to each other',
      );
      if (!response.success) {
        throw new Error((response as Error).message);
      }
      return response.data as CharacterList;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  public getChatConversation = async ({ characters }: CharacterList) => {
    try {
      const content = [
        'I think that the monarch has the right to rule Great Britain because God has chosen them to rule',
        'I believe that we should allow the stealing of bread if the person is starving',
        'I think that the world will end in the next 100 years because of climate change',
        'I think that Jesus will return in the next 100 years because the bible says so',
      ][Math.floor(Math.random() * 4)];

      const sender = characters[Math.floor(Math.random() * characters.length)];

      const receiver = characters.filter(
        (c) => c.first_name !== sender.first_name,
      )[Math.floor(Math.random() * characters.length - 1)];

      const generatedPrompt = `
      You are going to simulate a conversation between a group of characters and a player.
      Your setting is the winchester pub in which you find your characters ${JSON.stringify(
        characters,
      )}. 
      Every character must have a turn to speak and each character must speak at least once. 
      The conversation must last at least 10 turns. 
      The conversation must end with a question being asked to the player.
      A sender will address a message to a receiver.
      The receiver must respond to the sender.

       `;
      Logger.log(generatedPrompt);
      const response =
        await this.createTranslator('ChatConversation').translate(
          generatedPrompt,
        );
      if (!response.success) {
        throw new Error((response as Error).message);
      }
      return response.data as ChatConversation;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}

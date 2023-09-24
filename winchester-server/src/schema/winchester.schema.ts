import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type WinchesterDocument = HydratedDocument<Winchester>;
export type Message = {
  role: 'system' | 'user';
  content: string;
};
@Schema()
export class Winchester {
  @Prop()
  name: string;

  @Prop()
  messageList: Message[];
}

export const WinchesterSchema = SchemaFactory.createForClass(Winchester);

// task.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Task extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User',required:true })
  user: User | Types.ObjectId; // Reference to User
}

export const TaskSchema = SchemaFactory.createForClass(Task);

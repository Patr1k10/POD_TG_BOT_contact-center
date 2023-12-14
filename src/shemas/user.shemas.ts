import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PhoneNumber } from '../type/pfone.nomber';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true, type: Object })
  phoneNumber: PhoneNumber;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userFirstName: string;

  @Prop({ required: true })
  userLastName: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

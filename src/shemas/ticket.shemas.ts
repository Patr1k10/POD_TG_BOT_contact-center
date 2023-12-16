import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClientFullName } from '../type/client.full.name';

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  ticketId: string;

  @Prop({ required: true })
  ownerId: number;

  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true, type: Object })
  clientFullName: ClientFullName;

  @Prop({ required: true })
  eventName: string;

  @Prop({ required: true })
  eventLocation: string;

  @Prop({ required: true })
  eventDate: Date;

  @Prop({ required: true })
  ticketUrl: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

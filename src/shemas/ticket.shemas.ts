import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClientFullName } from '../type/client.full.name';
import { EventDateInterface } from '../type/event.date.interface';
import { FullPhoneNumber } from '../type/full.pfone.nomber.interface';

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  ownerId: number;

  @Prop({ required: true, type: Object })
  clientFullName: ClientFullName;

  @Prop({ required: true })
  eventName: string;

  @Prop({ required: true })
  eventLocation: string;

  @Prop({ required: true, type: Object })
  eventDate: EventDateInterface;

  @Prop({ required: true, type: Object })
  fullPhoneNumber: FullPhoneNumber;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

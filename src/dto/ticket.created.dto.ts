import { EventDateInterface } from '../type/event.date.interface';
import { ClientFullName } from '../type/client.full.name';
import { FullPhoneNumber } from '../type/full.pfone.nomber.interface';

export class TicketCreatedDto {
  ownerId: number;
  clientFullName: ClientFullName;
  eventName: string;
  eventLocation: string;
  eventDate: EventDateInterface;
  fullPhoneNumber: FullPhoneNumber;
}

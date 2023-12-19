import { Context as ContextTelegraf } from 'telegraf';
import { EventDateInterface } from './event.date.interface';
import { FullPhoneNumber } from './full.pfone.nomber.interface';

export interface IContext extends ContextTelegraf {
  session: {
    id?: string;
    fullPhoneNumber?: FullPhoneNumber;
    first_name?: string;
    last_name?: string;
    awaitingUserIdInput?: boolean;
    lastBotMessage?: number;
    selectEvent?: {
      name?: string;
      date?: EventDateInterface;
      location?: string;
    };
  };
}

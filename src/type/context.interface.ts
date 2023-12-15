import { Context as ContextTelegraf } from 'telegraf';

export interface IContext extends ContextTelegraf {
  session: {
    id?: string;
    phone_number?: string;
    first_name?: string;
    last_name?: string;
    awaitingUserIdInput?: boolean;
    lastBotMessage?: number;
  };
}

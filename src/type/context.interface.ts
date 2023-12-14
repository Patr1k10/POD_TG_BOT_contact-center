import { Context as ContextTelegraf } from 'telegraf';

export interface IContext extends ContextTelegraf {
  session: {
    id?: string;
    awaitingUserIdInput?: boolean;
    lastBotMessage?: number;
  };
}

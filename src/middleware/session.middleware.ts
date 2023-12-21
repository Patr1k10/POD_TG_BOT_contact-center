import { Middleware } from 'telegraf';
import { Mongo } from '@telegraf/session/mongodb';
import * as dotenv from 'dotenv';
import { IContext } from '../type/context.interface';

dotenv.config();

const mongoStore = Mongo({
  url: process.env.MONGODB_URL,
  database: process.env.MONGODB_NAME,
});

// Function to create a Telegraf session middleware
export function createSessionMiddleware(): Middleware<IContext> {
  return async (ctx, next) => {
    const key = ctx.from && ctx.chat ? `${ctx.from.id}:${ctx.chat.id}` : null;

    if (key) {
      ctx.session = await mongoStore.get(key);
      if (!ctx.session) {
        ctx.session = {};
      }
      await next();
      await mongoStore.set(key, ctx.session);
    } else {
      await next();
    }
  };
}

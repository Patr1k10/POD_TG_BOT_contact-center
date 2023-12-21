import { Middleware } from 'telegraf';
import { IContext } from '../type/context.interface';
import { groupMenu } from '../battons/app.buttons';

// Middleware for handling errors during Telegram updates processing.
export function errorHandlingMiddleware(): Middleware<IContext> {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return;
      }
      const sentMessage = await ctx.reply('🔽Основне меню🔽', groupMenu());
      ctx.session.lastBotMessage = sentMessage.message_id;
      console.log('errorHandlingMiddleware');
    }
  };
}

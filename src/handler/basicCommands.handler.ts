import { Start, Update } from 'nestjs-telegraf';
import { Logger } from '@nestjs/common';
import { IContext } from '../type/context.interface';

@Update()
export class BasicCommandsHandler {
  private readonly logger: Logger = new Logger(BasicCommandsHandler.name);

  @Start()
  async startCommand(ctx: IContext) {
    const user = ctx.from;
    this.logger.log(`
      User ID: ${user.id}
      First Name: ${user.first_name}
      Last Name: ${user.last_name}
      Username: ${user.username}`);
    this.logger.log('startCommand executed successfully');
    await ctx.reply('hello world');
  }
}

import { Action, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Logger } from '@nestjs/common';
import { IContext } from '../type/context.interface';
import { IMessage } from '../type/message.interface';
import { createPhoneNumberButton, registerButton } from '../battons/app.buttons';

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
    await ctx.reply(
      'Вітаємо вас у Цирку! 🎪🤹‍♂️ \nТут ви можете легко та швидко забронювати квиток на наші захоплюючі вистави. ' +
        '\nАле спочатку треба зареєструватися',
      registerButton(),
    );
  }

  @Action('register')
  async register(ctx: IContext) {
    this.logger.log('register');
    await ctx.reply('🔽Натисніть кнопку🔽', createPhoneNumberButton());
  }

  @On('contact')
  async onContact(ctx: IContext) {
    const message = ctx.message as IMessage;
    if (!message.contact.last_name) {
      await ctx.reply('Будь ласка додайте призвише');
      ctx.session.awaitingUserIdInput = true;
    }
    ctx.session.phone_number = message.contact.phone_number;
    ctx.session.first_name = message.contact.first_name;
    ctx.session.last_name = message.contact.last_name;
    this.logger.log(message.contact);
  }

  @Hears(/^[а-яА-ЯёЁіІїЇґҐ]+$/iu)
  async addUserId(ctx: IContext) {
    if (ctx.session.awaitingUserIdInput === false) {
      return;
    }
    const message = ctx.message as IMessage;
    ctx.session.last_name = message.text;
    ctx.session.awaitingUserIdInput = false;
  }
}

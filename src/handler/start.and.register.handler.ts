import { Action, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Logger } from '@nestjs/common';
import { IContext } from '../type/context.interface';
import { IMessage } from '../type/message.interface';
import { createPhoneNumberButton, groupMenu, registerButton } from '../battons/app.buttons';
import { UserService } from '../service/user.service';

@Update()
export class StartAndRegisterHandler {
  private readonly logger: Logger = new Logger(StartAndRegisterHandler.name);

  constructor(private readonly userService: UserService) {}
  //Handle the "/start" command.
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
  //Handle the "register" action.
  @Action('register')
  async register(ctx: IContext) {
    await ctx.deleteMessage();
    this.logger.log('register');
    await ctx.reply('🔽Натисніть кнопку🔽', createPhoneNumberButton());
  }
  //Handle incoming contact information.
  @On('contact')
  async onContact(ctx: IContext) {
    const message = ctx.message as IMessage;
    const { phone_number, first_name, last_name } = message.contact;
    // Extract country code and phone number
    const countryCode = phone_number.substring(0, 3);
    const phoneNumber = phone_number.substring(3);
    // Save contact information in the session
    ctx.session.fullPhoneNumber = { countryCode, phoneNumber };
    ctx.session.first_name = first_name;
    ctx.session.last_name = last_name;
    // Prompt the user to add a last name if not provided
    if (!last_name) {
      await ctx.reply('Будь ласка додайте призвише');
      ctx.session.awaitingUserIdInput = true;
      return;
    }
    // Register the user
    await this.registerUser(ctx);
  }

  //Handle text messages containing only Cyrillic characters for adding a user ID.
  @Hears(/^[а-яА-ЯёЁіІїЇґҐ]+$/iu)
  async addUserId(ctx: IContext) {
    // Check if waiting for user ID input
    if (ctx.session.awaitingUserIdInput === false) {
      return;
    }
    const message = ctx.message as IMessage;
    ctx.session.last_name = message.text;
    ctx.session.awaitingUserIdInput = false;
    await ctx.deleteMessage();
    await this.registerUser(ctx);
  }

  //Register the user based on the provided information.
  private async registerUser(ctx: IContext) {
    const { fullPhoneNumber, first_name, last_name } = ctx.session;
    // Register the user using the UserService
    await this.userService.registerUser({
      userId: ctx.from.id,
      fullPhoneNumber,
      userName: ctx.from.username,
      userFirstName: first_name,
      userLastName: last_name,
    });
    await ctx.deleteMessage();
    const message = await ctx.reply('🔽Основне меню🔽', groupMenu());
    ctx.session.lastBotMessage = message.message_id;
  }
}

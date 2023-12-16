import { Action, Update } from 'nestjs-telegraf';
import { Logger } from '@nestjs/common';
import { UserService } from '../service/register.service';
import { IContext } from '../type/context.interface';

@Update()
export class MainMenuHandler {
  private readonly logger: Logger = new Logger(MainMenuHandler.name);

  constructor(private readonly userService: UserService) {}

  @Action('choose_event')
  async choose_event(ctx: IContext) {
    this.logger.log('choose_event');
    // Ваша логіка для кнопки "Оберіть подію" тут
  }

  @Action('your_tickets')
  async your_tickets(ctx: IContext) {
    this.logger.log('your_tickets');
    // Ваша логіка для кнопки "Ваші квитки" тут
  }

  @Action('profile')
  async profile(ctx: IContext) {
    const user = await this.userService.getUserForUserId(ctx.from.id);
    await ctx.reply(
      `Ваше ім'я: ${user.userFirstName}
      Ваше призвище: ${user.userLastName}
      Ваш номер телефону: +${user.fullPhoneNumber.countryCode}${user.fullPhoneNumber.phoneNumber}`,
    );
    this.logger.log('profile');
  }

  @Action('reminders')
  async reminders(ctx: IContext) {
    this.logger.log('reminders');
    // Ваша логіка для кнопки "Нагадування" тут
  }

  @Action('support')
  async support(ctx: IContext) {
    this.logger.log('support');
    // Ваша логіка для кнопки "Підтримка" тут
  }

  @Action('promocodes')
  async promocodes(ctx: IContext) {
    this.logger.log('promocodes');
    // Ваша логіка для кнопки "Промокоди" тут
  }

  @Action('payment_options')
  async payment_options(ctx: IContext) {
    this.logger.log('payment_options');
    // Ваша логіка для кнопки "Опції оплати" тут
  }

  @Action('contact_operator')
  async contact_operator(ctx: IContext) {
    this.logger.log('contact_operator');
    // Ваша логіка для кнопки "Зв'язок з оператором" тут
  }

  // Додайте інші кнопки, які ви маєте в меню...
}

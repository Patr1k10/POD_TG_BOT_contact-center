import { Action, Update } from 'nestjs-telegraf';
import { Logger } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { IContext } from '../type/context.interface';
import { eventMenu, groupMenu } from '../battons/app.buttons';
import { TicketService } from '../service/ticket.service';
import { HELP_MESSAGE } from '../constants/massage';
import { events } from '../constants/events';

@Update()
export class MainMenuHandler {
  private readonly logger: Logger = new Logger(MainMenuHandler.name);

  constructor(
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
  ) {}

  @Action('choose_event')
  async choose_event(ctx: IContext) {
    this.logger.log('choose_event');
    await ctx.reply('Оберіть подію', eventMenu(events));
  }

  @Action('your_tickets')
  async your_tickets(ctx: IContext) {
    this.logger.log('your_tickets');
    const userId = ctx.from.id;
    const tickets = await this.ticketService.getTicketByOwnerId(userId);
    if (tickets.length === 0) {
      await ctx.reply('У вас немає жодних квитків.');
    } else {
      for (const ticket of tickets) {
        const ticketInfo = `Назва події: ${ticket.eventName}\nДата: d:${ticket.eventDate.day} m:${ticket.eventDate.month} y:${ticket.eventDate.year}\nМісце: ${ticket.eventLocation}`;
        await ctx.reply(ticketInfo);
      }
    }
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

  @Action('support')
  async support(ctx: IContext) {
    this.logger.log('support');
    await ctx.reply(HELP_MESSAGE);
  }

  @Action('contact_operator')
  async contact_operator(ctx: IContext) {
    const operatorTelegramId = process.env.SUPPORT_ID;

    const message = `Користувач хоче зв'язатися із вами. Відправник: @${ctx.from.username}`;
    await ctx.telegram.sendMessage(operatorTelegramId, message);
    await ctx.reply('Ваш запит надіслано оператору. Чекайте на відповідь. Чекайте на відповіть в особисті');
  }

  @Action('back')
  async back(ctx: IContext) {
    await ctx.reply('🔽Основне меню🔽', groupMenu());
  }
}

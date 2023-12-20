import { Action, Update } from 'nestjs-telegraf';
import { Logger } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { IContext } from '../type/context.interface';
import { backButton, eventMenu, groupMenu } from '../battons/app.buttons';
import { TicketService } from '../service/ticket.service';
import { HELP_MESSAGE } from '../constants/massage';
import { events } from '../constants/events';
import { QrcodeService } from '../service/qrcode.service';

@Update()
export class MainMenuHandler {
  private readonly logger: Logger = new Logger(MainMenuHandler.name);

  constructor(
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
    private readonly qrcodeService: QrcodeService,
  ) {}

  //Handle the "choose_event" action to display the event menu.
  @Action('choose_event')
  async choose_event(ctx: IContext) {
    this.logger.log('choose_event');
    await ctx.editMessageText('Оберіть подію', eventMenu(events));
  }
  // Handle the "your_tickets" action to display user's tickets or a message if none.
  @Action('your_tickets')
  async your_tickets(ctx: IContext) {
    this.logger.log('your_tickets');
    const userId = ctx.from.id;
    const tickets = await this.ticketService.getTicketByOwnerId(userId);
    if (tickets.length === 0) {
      await ctx.reply('У вас немає жодних квитків.');
    } else {
      for (const ticket of tickets) {
        // Format ticket information and send QR code to the user
        const ticketInfo = `
        Назва події: ${ticket.eventName} 
        Дата: ${ticket.eventDate.day}.${ticket.eventDate.month}.${ticket.eventDate.year} 
        Місце номер: ${ticket.eventLocation}
        Власнык: 
        Имя: ${ctx.session.first_name}
        Призвище: ${ctx.session.last_name}
        Телефон: +${ctx.session.fullPhoneNumber.countryCode}${ctx.session.fullPhoneNumber.phoneNumber}`;
        await this.qrcodeService.sendQRCodeToUser(ctx, ticketInfo);
      }
    }
    await ctx.reply('повернутіся', backButton());
  }
  // Handle the "profile" action to display user's profile information.
  @Action('profile')
  async profile(ctx: IContext) {
    const user = await this.userService.getUserForUserId(ctx.from.id);
    await ctx.editMessageText(
      `Ваше ім'я: ${user.userFirstName}
      Ваше призвище: ${user.userLastName}
      Ваш номер телефону: +${user.fullPhoneNumber.countryCode}${user.fullPhoneNumber.phoneNumber}`,
      backButton(),
    );
    this.logger.log('profile');
  }
  // Handle the "support" action to display help message.
  @Action('support')
  async support(ctx: IContext) {
    this.logger.log('support');
    await ctx.editMessageText(HELP_MESSAGE, backButton());
  }
  //  Handle the "contact_operator" action to notify the operator.
  @Action('contact_operator')
  async contact_operator(ctx: IContext) {
    const operatorTelegramId = process.env.SUPPORT_ID;
    const message = `Користувач хоче зв'язатися із вами. Відправник: @${ctx.from.username}`;
    await ctx.telegram.sendMessage(operatorTelegramId, message);
    await ctx.editMessageText(
      'Ваш запит надіслано оператору. Чекайте на відповідь. Чекайте на відповіть в особисті',
      backButton(),
    );
  }
  // Handle the "back" action to return to the main menu.
  @Action('back')
  async back(ctx: IContext) {
    await ctx.editMessageText('🔽Основне меню🔽', groupMenu());
  }
}

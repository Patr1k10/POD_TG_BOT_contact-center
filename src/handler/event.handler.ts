import { Action, Update } from 'nestjs-telegraf';
import { Logger } from '@nestjs/common';
import { IContext } from '../type/context.interface';
import { ICallbackQuery } from '../type/callback.query.interface';
import { events } from '../constants/events';
import { dateMenuByEvent, groupMenu, seatSelectionMenu } from '../battons/app.buttons';
import { UserService } from '../service/user.service';
import { TicketService } from '../service/ticket.service';

@Update()
export class EventHandler {
  private readonly logger: Logger = new Logger(EventHandler.name);
  constructor(
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
  ) {}
  //  Handle the "event" action to display date selection menu for a specific event.
  @Action(/event:(.+)/)
  async event(ctx: IContext) {
    const callbackQuery: ICallbackQuery = ctx.callbackQuery as ICallbackQuery;
    const eventId = parseInt(callbackQuery.data.split(':')[1], 10) - 1;
    this.logger.log(eventId);
    await ctx.editMessageText('выберете место', dateMenuByEvent(events[eventId]));
  }
  // Handle the "event" action to display date selection menu for a specific event.
  @Action(/selectedEventDate:(\d+):(\d+)-(\d+)-(\d+)/)
  async selectedEventDate(ctx: IContext) {
    const callbackQuery: ICallbackQuery = ctx.callbackQuery as ICallbackQuery;
    const match = callbackQuery.data.match(/selectedEventDate:(\d+:\d+-\d+-\d+)/);
    if (match) {
      const [fullData, eventData] = match;
      const [eventId, datePart] = eventData.split(':');
      const [day, month, year] = datePart.split('-');
      const selectedEventId = parseInt(eventId, 10) - 1;
      const selectedEventDate = `${day}-${month}-${year}`;
      this.logger.log(`selectedEventDate: ${selectedEventDate} ${selectedEventId}`);
      ctx.session.selectEvent = { name: events[selectedEventId].name, date: { day: day, month: month, year: year } };
      await ctx.editMessageText('оберить мисце', seatSelectionMenu(events[selectedEventId].availableSeat));
    }
  }
  // Handle the "seat" action to process the selected seat, create a ticket, and show a success message.
  @Action(/seat:(.+)/)
  async selectEventSeat(ctx: IContext) {
    const callbackQuery: ICallbackQuery = ctx.callbackQuery as ICallbackQuery;
    ctx.session.selectEvent.location = callbackQuery.data.split(':')[1];
    // Create a ticket using the TicketService
    await this.ticketService.createTicket({
      ownerId: ctx.from.id,
      clientFullName: { firstName: ctx.session.first_name, lastName: ctx.session.last_name },
      eventName: ctx.session.selectEvent.name,
      eventDate: {
        day: ctx.session.selectEvent.date.day,
        year: ctx.session.selectEvent.date.year,
        month: ctx.session.selectEvent.date.month,
      },
      eventLocation: ctx.session.selectEvent.location,
      fullPhoneNumber: {
        countryCode: ctx.session.fullPhoneNumber.countryCode,
        phoneNumber: ctx.session.fullPhoneNumber.phoneNumber,
      },
    });
    // Clean up session data and show success message
    delete ctx.session.selectEvent;
    await ctx.editMessageText('✅Кавиток створино✅', groupMenu());
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from '../shemas/ticket.shemas';
@Injectable()
export class TicketService {
  private readonly logger: Logger = new Logger(TicketService.name);
  constructor(@InjectModel('Ticket') private readonly ticketModel: Model<Ticket>) {}

  async getTicketByOwnerId(ownerId: number): Promise<Ticket[]> {
    return await this.ticketModel.find({ ownerId }).exec();
  }
}

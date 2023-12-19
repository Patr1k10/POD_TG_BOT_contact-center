import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from '../shemas/ticket.shemas';
import { TicketCreatedDto } from '../dto/ticket.created.dto';
@Injectable()
export class TicketService {
  private readonly logger: Logger = new Logger(TicketService.name);
  constructor(@InjectModel('Ticket') private readonly ticketModel: Model<Ticket>) {}

  async getTicketByOwnerId(ownerId: number): Promise<Ticket[]> {
    return await this.ticketModel.find({ ownerId }).exec();
  }
  async createTicket(ticketDto: TicketCreatedDto): Promise<Ticket> {
    try {
      const createdTicket = new this.ticketModel(ticketDto);
      return await createdTicket.save();
    } catch (error) {
      this.logger.error(`Error creating ticket: ${error.message}`);
      throw error;
    }
  }
}

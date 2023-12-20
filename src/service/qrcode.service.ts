import { createCanvas } from 'canvas';
import * as qrcode from 'qrcode';
import { IContext } from '../type/context.interface';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { TicketService } from './ticket.service';
import { backButton } from '../battons/app.buttons';

@Injectable()
export class QrcodeService {
  private readonly logger: Logger = new Logger(QrcodeService.name);

  constructor(
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
  ) {}

  async generateQRCode(data: string): Promise<string> {
    const canvas = createCanvas(200, 200);
    await qrcode.toCanvas(canvas, data);
    return canvas.toDataURL();
  }

  async sendQRCodeToUser(ctx: IContext, data: string): Promise<void> {
    try {
      const qrCodeUrl = await this.generateQRCode(data);
      const base64Data = qrCodeUrl.replace(/^data:image\/png;base64,/, '');
      this.logger.log(base64Data);
      await ctx.replyWithPhoto(
        { source: Buffer.from(base64Data, 'base64') },
        { reply_markup: backButton().reply_markup },
      );
    } catch (error) {
      this.logger.error('Error sending QR code:', error);
    }
  }
}

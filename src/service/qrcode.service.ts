import { createCanvas } from 'canvas';
import * as qrcode from 'qrcode';
import { IContext } from '../type/context.interface';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class QrcodeService {
  private readonly logger: Logger = new Logger(QrcodeService.name);
  // Method to generate a QR code image as a data URL
  async generateQRCode(data: string): Promise<string> {
    const canvas = createCanvas(200, 200);
    await qrcode.toCanvas(canvas, data);
    return canvas.toDataURL();
  }

  // Method to send a generated QR code image to the user via a messaging context (ctx)
  async sendQRCodeToUser(ctx: IContext, data: string): Promise<void> {
    try {
      // Generate QR code image data URL
      const qrCodeUrl = await this.generateQRCode(data);
      // Extract base64 data from the data URL
      const base64Data = qrCodeUrl.replace(/^data:image\/png;base64,/, '');
      this.logger.log(base64Data);
      // Send the QR code image to the user
      await ctx.replyWithPhoto({ source: Buffer.from(base64Data, 'base64') });
    } catch (error) {
      this.logger.error('Error sending QR code:', error);
    }
  }
}

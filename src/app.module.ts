import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './mongodb/mongoose-config.service';
import { Ticket, TicketSchema } from './shemas/ticket.shemas';
import { User, UserSchema } from './shemas/user.shemas';
import { TelegrafModule } from 'nestjs-telegraf';
import { createSessionMiddleware } from './middleware/session.middleware';
import { StartAndRegisterHandler } from './handler/start.and.register.handler';
import { UserService } from './service/user.service';
import { MainMenuHandler } from './handler/main.menu.handler';
import { TicketService } from './service/ticket.service';

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [createSessionMiddleware()],
      token: process.env.TELEGRAM_TOKEN,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [StartAndRegisterHandler, MainMenuHandler, UserService, TicketService],
  exports: [],
})
export class AppModule {}

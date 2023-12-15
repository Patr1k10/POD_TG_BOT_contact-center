import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../shemas/user.shemas';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/register.user.dto';
@Injectable()
export class RegisterService {
  private readonly logger: Logger = new Logger(RegisterService.name);
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { userId, fullPhoneNumber, userName, userFirstName, userLastName } = createUserDto;

    const createdUser = new this.userModel({
      userId,
      fullPhoneNumber: {
        countryCode: fullPhoneNumber.countryCode,
        phoneNumber: fullPhoneNumber.phoneNumber,
      },
      userName,
      userFirstName,
      userLastName,
    });
    this.logger.log(`registerUser: ${createdUser}`);

    return createdUser.save();
  }
}

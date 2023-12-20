import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../shemas/user.shemas';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/register.user.dto';
@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // Method to register a new user or update existing user information
  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { userId, fullPhoneNumber, userName, userFirstName, userLastName } = createUserDto;
    const existingUser = await this.userModel.findOne({ userId });
    if (existingUser) {
      // Update existing user information
      existingUser.fullPhoneNumber = {
        countryCode: fullPhoneNumber.countryCode,
        phoneNumber: fullPhoneNumber.phoneNumber,
      };
      existingUser.userName = userName;
      existingUser.userFirstName = userFirstName;
      existingUser.userLastName = userLastName;
      this.logger.log(`registerUser: Updating existing user with userId ${userId}`);
      return existingUser.save();
    } else {
      // Create a new user
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
      this.logger.log(`registerUser: Creating new user with userId ${userId}`);
      return createdUser.save();
    }
  }
  // Method to retrieve user information based on userId
  async getUserForUserId(userId: number): Promise<User> {
    return await this.userModel.findOne({ userId }).exec();
  }
}

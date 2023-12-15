
export class CreateUserDto {
  userId: number;
  fullPhoneNumber: FullPhoneNumberDto;
  userName: string;
  userFirstName: string;
  userLastName: string;
}

export class FullPhoneNumberDto {
  countryCode: string;
  phoneNumber: string;
}

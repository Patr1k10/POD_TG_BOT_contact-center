import { Markup } from 'telegraf';

export const createPhoneNumberButton = () => {
  return Markup.keyboard([[{ text: 'Надіслати номер телефону', request_contact: true }]])
    .oneTime()
    .resize();
};

export function registerButton() {
  return Markup.inlineKeyboard([Markup.button.callback('Реєстрація📝', 'register')]);
}

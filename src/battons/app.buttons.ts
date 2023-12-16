import { Markup } from 'telegraf';

export const createPhoneNumberButton = () => {
  return Markup.keyboard([[{ text: 'Надіслати номер телефону', request_contact: true }]])
    .oneTime()
    .resize();
};

export function registerButton() {
  return Markup.inlineKeyboard([Markup.button.callback('Реєстрація📝', 'register')]);
}

export function groupMenu() {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Оберіть подію', 'choose_event'),
      Markup.button.callback('Ваші квитки', 'your_tickets'),
      Markup.button.callback('Профіль', 'profile'),
      Markup.button.callback('Нагадування', 'reminders'),
      Markup.button.callback('Підтримка', 'support'),
      Markup.button.callback('Промокоди', 'promocodes'),
      Markup.button.callback('Опції оплати', 'payment_options'),
      Markup.button.callback('Зв`язок з оператором', 'contact_operator'),
    ],
    {
      columns: 2,
    },
  );
}

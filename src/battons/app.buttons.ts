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
      Markup.button.callback('Підтримка', 'support'),
      Markup.button.callback('Зв`язок з оператором', 'contact_operator'),
    ],
    {
      columns: 2,
    },
  );
}

export function eventMenu() {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Гала-вечірка з акробатикою', 'event:1'),
      Markup.button.callback('Вистава дельфінів та морських котиків', 'event:2'),
      Markup.button.callback('Казкове виставове представлення для дітей', 'event:3'),
      Markup.button.callback('Екстримальні номери від сміливих артистів', 'event:4'),
      Markup.button.callback('Магічне шоу з ілюзіями та фокусами', 'event:5'),
      Markup.button.callback('Вечір відділеної музики та танців', 'event:6'),
      Markup.button.callback('Театралізована вистава із залученням глядачів', 'event:7'),
      Markup.button.callback('↩️Повернутися', 'back'),
    ],
    {
      columns: 1,
    },
  );
}

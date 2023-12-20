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

export function eventMenu(events: any[]) {
  const buttons = events.map((event) => Markup.button.callback(event.name, `event:${event.id}`));

  buttons.push(Markup.button.callback('↩️Повернутися', 'back'));

  return Markup.inlineKeyboard(buttons, {
    columns: 1,
  });
}

export function seatSelectionMenu(seats: number[]) {
  const buttons = seats.map((seat) => Markup.button.callback(`Місце ${seat}`, `seat:${seat}`));

  buttons.push(Markup.button.callback('↩️Повернутися', 'back'));

  return Markup.inlineKeyboard(buttons, {
    columns: 3,
  });
}

export function dateMenuByEvent(selectedEvent: any) {
  const buttons = (selectedEvent.date || []).map((date) =>
    Markup.button.callback(
      `${date.day}/${date.month}/${date.year}`,
      `selectedEventDate:${selectedEvent.id}:${date.day}-${date.month}-${date.year}`,
    ),
  );

  buttons.push(Markup.button.callback('↩️Повернутися', 'back'));

  return Markup.inlineKeyboard(buttons, {
    columns: 2,
  });
}

export function backButton() {
  return Markup.inlineKeyboard([Markup.button.callback('↩️Повернутися', 'back')]);
}

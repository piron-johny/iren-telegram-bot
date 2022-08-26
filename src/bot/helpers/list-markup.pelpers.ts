import { GoogleSpreadsheetRow } from "google-spreadsheet";

export const listMarkup = (list: GoogleSpreadsheetRow[]) => {
  const space = new Array(15).fill('&#8201');
  const space5 = new Array(5).fill('&#8201');
  const sum = list.reduce((acc, i) => Math.round(i.symbols / 1000 * i.amount), 0);

  return `<b>Дата</b>${space.join('')}<b>Цена</b>${space5.join('')}<b>Символы</b>${space5.join('')}<b>Название</b>\n\n${list
    .map((l) => `${l.date}  |  ${l.amount} грн  |  ${l.symbols || '- - - -'}  |  ${l.name}\n`)
    .join('')}\n Сумма ${space.join('')}<b>${sum} грн</b>`;
};
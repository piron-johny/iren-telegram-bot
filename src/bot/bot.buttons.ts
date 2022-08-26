import { Markup } from 'telegraf';
import { buttonName } from './constants/button.constants';

const { add } = buttonName;

export const buttons = () => {
  return Markup.keyboard([Markup.button.callback(add.name, add.data)])
    .oneTime()
    .resize();
};


import { Markup } from "telegraf"
import { buttonName } from "./constants/button.constants"

const { list, add, skills, stop } = buttonName

export const buttons = () => {
  return Markup.keyboard(
    [
      [Markup.button.callback(list.name, list.data)],
      [
        Markup.button.callback(add.name, add.data),
        Markup.button.callback(skills.name, skills.data),
      ],
      [Markup.button.callback(stop.name, stop.data)],
    ],
  ).oneTime().resize()
}
export const buttonsLine = () => {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('test', 'test'),
      Markup.button.callback('test2', 'test222222'),
      Markup.button.callback('/help', 'test3'),
    ],
    // {
    //   columns: 3,
    // }
  )
}
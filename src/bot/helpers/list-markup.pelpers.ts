export const listMarkup = (list: any[]) => {
  const space = new Array(20).fill('&#8201')
  const sum = list.reduce((acc, i) => {
    acc += i.cost;
    return acc
  }, 0)
  return `<b>Дата</b>${space.join('')}<b>Цена</b>\n\n${list.map(l => `${l.date}  |  ${l.cost} грн\n`).join('')}\n Сумма ${space.join('')}<b>${sum} грн</b>`

}
// eslint-disable-next-line no-unused-vars
export default function statusFilter(value) {
  if (value) {
    const regexp = /[а-яё]/i
    if (!regexp.test(value)) {
      const itemsEn = [
        {
          ACTIVE: 'Активный',
        },
        {
          DEFAULTER: 'Неплательщик',
        },
        {
          EXPIRED: 'Истекший',
        },
        {
          DONE: 'Оплачен',
        },
        {
          DELAY: 'Задержан',
        },
        {
          WAIT: 'Ожидание',
        },
        {
          PRISONER: 'Подсудимый',
        },
        {
          DEFAULTER: 'Добросовестный',
        },
        {
          FRAUD: 'Аферист',
        },
        {
          DELAY: 'Затягивает',
        },
        {
          WAIT: 'Ожидание',
        },
      ]
      const localSelect = itemsEn.filter(item => item[value]) // нахожу нужный элемент из массива
      const CurrentSelect = Object.values(localSelect[0]) // получаю только его значение
      // eslint-disable-next-line prefer-destructuring
      return CurrentSelect[0]
    } else {
      const itemsRu = [
        {
          Неплательщик: 'DEFAULTER',
        },
        {
          Истекший: 'EXPIRED',
        },
        {
          Оплачен: 'DONE',
        },
        {
          Задержан: 'DELAY',
        },
        {
          Ожидание: 'WAIT',
        },
        {
          Подсудимый: 'PRISONER',
        },
        {
          Добросовестный: 'DEFAULTER',
        },
        {
          Аферист: 'FRAUD',
        },
        {
          Затягивает: 'DELAY',
        },
        {
          Ожидание: 'WAIT',
        },
      ]
      const localSelect = itemsRu.filter(item => item[value]) // нахожу нужный элемент из массива
      const CurrentSelect = Object.values(localSelect[0]) // получаю только его значение
      // eslint-disable-next-line prefer-destructuring
      return CurrentSelect[0]
    }
  }
  return false
}

export class Card {
  constructor(card, cardSelector) {
    this.cardname = card.name
    this.cardlink = card.link
    this.cardSelector = cardSelector
  }

  // Клонирование карточки
  _getTemplate() {
    return document
      .querySelector(this.cardSelector)
      .content
      .querySelector('.elements__list-item')
      .cloneNode(true)
  }

  _setEventlisteners() {
    this.card.querySelector('.elements__trash').addEventListener('click', () => {
      return this._delete()

    })
    this.card.querySelector('.elements__picture').addEventListener('click', () => {
      return this._prewecard()
    })
    this.card.querySelector('.elements__icon').addEventListener('click', () => {
      return this._like()
    })
  }

  _like() {

  }

  _delete() {

  }

  _prewecard() {

  }

  // Отрисовка наполенной карточки
  render() {
    //Вызываем гет темп и клонируем готовую карточку
    this.card = this._getTemplate()
    //Наполнение Н2
    this.card.querySelector('.elements__text').textContent = this.cardname
    //Наполенение imq
    this.card.querySelector('.elements__picture').src = this.cardlink
    this.card.querySelector('.elements__picture').alt = this.cardname
    //Вешаемслушетеля на карточку
    this._setEventlisteners()
    //Возвращаем наполненную карточку
    return this.card
  }

}





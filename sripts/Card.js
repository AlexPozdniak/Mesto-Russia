export class Card {
  constructor(card, cardSelector, openPopup, previewCardPopup) {
    this.cardName = card.name
    this.cardLink = card.link
    this.cardSelector = cardSelector
    this.openPopup = openPopup
    this.previewCardPopup = previewCardPopup
    this.previewPopupImage = previewCardPopup.querySelector('.popup__image')
    this.previewPopupText = previewCardPopup.querySelector('.popup__text')
  }

  // Клонирование карточки
  #getTemplate() {
    return document
      .querySelector(this.cardSelector)
      .content
      .querySelector('.elements__list-item')
      .cloneNode(true)
  }

  #setEventListeners() {
    this.card.querySelector('.elements__trash').addEventListener('click', () => {
      return this.#delete()

    })
    this.card.querySelector('.elements__picture').addEventListener('click', () => {
      return this.#previewCard()
    })
    this.card.querySelector('.elements__icon').addEventListener('click', () => {
      return this.#like()
    })
  }

  #like() {
    const likeElement = this.card.querySelector('.elements__icon')
    likeElement.classList.toggle('elements__icon-active')
  }

  #delete() {
    this.card.remove()
  }

  #previewCard() {
    this.previewPopupImage.src = this.cardLink
    this.previewPopupImage.alt = this.cardName
    this.previewPopupText.textContent = this.cardName
    this.openPopup(this.previewCardPopup)
  }

  // Отрисовка наполенной карточки
  render() {
    //Вызываем гет темп и клонируем готовую карточку
    this.card = this.#getTemplate()
    //Наполнение Н2
    this.card.querySelector('.elements__text').textContent = this.cardName
    //Наполенение imq
    this.card.querySelector('.elements__picture').src = this.cardLink
    this.card.querySelector('.elements__picture').alt = this.cardName
    //Вешаемслушетеля на карточку
    this.#setEventListeners()
    //Возвращаем наполненную карточку
    return this.card
  }

}





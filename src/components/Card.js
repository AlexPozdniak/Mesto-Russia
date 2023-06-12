export class Card {
  constructor(
    { name, link, owner, likes, _id },
    {
      handleCardClick,
      deleteCard,
      toggleLike,
    },
    cardSelector,
    userId,
  ) {
    this._name = name;
    this._link = link;
    this._ownerId = owner._id;
    this._likes = likes;
    this._cardId = _id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._toggleLike = toggleLike;
  }

  // Клонирование карточки
  #getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__list-item')
      .cloneNode(true);
  }

  #setEventListeners() {
    this._cardPreview = this.card.querySelector('.elements__picture');
    this._likeButton = this.card.querySelector('.elements__icon');
    this._likesCount = this.card.querySelector('.elements__counter');
    this._cardDelete = this.card.querySelector('.elements__trash');

    if (this._ownerId === this._userId) {
      this._cardDelete.addEventListener('click', () => {
        this._deleteCard(this._cardId);
      });
    } else {
      this._cardDelete.remove();
      this._cardDelete = null;
    }

    this._cardPreview.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._toggleLike(this._cardId);
    });
  }

  delete() {
    this.card.remove();

    this._cardPreview = null;
    this._cardDelete = null;
    this._likeButton = null;
    this.card = null;
  }

  setLikes(likes) {
    this._likes = likes;
    this._likesCount.textContent = this._likes.length;

    this.hasUserLike = !this.hasUserLike;
    this._likeButton.classList.toggle('elements__icon-active');
  }

  // Отрисовка наполенной карточки
  render() {
    this.card = this.#getTemplate();
    this.#setEventListeners();
    this.hasUserLike = this._likes.some(item => item._id === this._userId);

    if (this.hasUserLike) {
      this._likeButton.classList.add('elements__icon-active');
    }

    this.card.querySelector('.elements__text').textContent = this._name;
    this._cardPreview.src = this._link;
    this._cardPreview.alt = this._name;
    this._likesCount.textContent = this._likes.length;

    return this.card;
  }

}





const UI_ELEMENTS = {
  FORM: {
    BIO: document.querySelector('#edit-form'),
    CARD: document.querySelector('#add-form'),
    AVATAR: document.querySelector('#avatar-form'),
  },

  BUTTON: {
    BIO_EDIT: document.querySelector('.profile__edit-button'),
    ADD_CARD: document.querySelector('.profile__add-button'),
    AVATAR_EDIT: document.querySelector('.profile__avatar-edit-button'),
  },
};

UI_ELEMENTS.INPUT = {
  TITLE: UI_ELEMENTS.FORM.BIO.querySelector('.popup__input_type_title'),
  DESCRIPTION: UI_ELEMENTS.FORM.BIO.querySelector('.popup__input_type_job'),
  AVATAR: UI_ELEMENTS.FORM.AVATAR.querySelector('.popup__input_type_avatar')
};

UI_ELEMENTS.SAVE_BUTTON = {
  BIO: UI_ELEMENTS.FORM.BIO.querySelector('.popup__save-button'),
  AVATAR: UI_ELEMENTS.FORM.AVATAR.querySelector('.popup__save-button'),
}

const profileSelectors = {
  username: '.profile__name',
  userDescr: '.profile__job',
  avatar: '.profile__avatar-img',
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled', // класс заблокированной кнопки
  inputErrorClass: 'popup__input_type_error', // класс невалидного инпута ( __ red)
  errorClass: 'popup__error_visible', // visibility: visible у ошибки
  errorElement: '.popup__input-error' // span ошибки
}

const API_CONFIG = {
  token: 'e253ca36-1fab-496f-8fe5-7eb3f8a75878',
  group: 'cohort-68',
  url: 'https://mesto.nomoreparties.co/v1/',
}

export { UI_ELEMENTS, config, profileSelectors, API_CONFIG }

import { Card } from './card.js'
import {FormValidator} from './FormValidator.js'

// Формы
const editForm = document.getElementById('edit-form');
const addCardForm = document.getElementById('add-form');
// Попапы
const profilePopup = document.querySelector('.popup_type_profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const previewCardPopup = document.querySelector('.popup_type_preview-card');
const closeButtons = document.querySelectorAll('.popup__close-button');
// X
const profileCloseButton = document.getElementById('edit-close')
const addCardCloseButton = document.getElementById('add-close')
const previewCardCloseButton = document.getElementById('preview-close')

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// Инпуты попапа Профиля
const titleInput = editForm.querySelector('.popup__input_type_title');
const jobInput = editForm.querySelector('.popup__input_type_job');
// Инпуты попапа Добавления карточки
const nameInput = addCardForm.querySelector('.popup__input_type_name');
const linkInput = addCardForm.querySelector('.popup__input_type_link');

const previewPopupImage = previewCardPopup.querySelector('.popup__image')
const previewPopupText = previewCardPopup.querySelector('.popup__text')

// <h1> <p>
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const cardList = document.querySelector('.elements__list')

const cardTemplate = cardList.content.querySelector('.elements__list-item')

// крестик у previewCard
// корзина удаления

const initialCards = [
  {
    name: 'Relax Time',
    link: 'https://images.unsplash.com/photo-1639224197881-c835df14ed26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled', // класс заблокированной кнопки
  inputErrorClass: 'popup__input_type_error', // класс невалидного инпута ( __ red)
  errorClass: 'popup__error_visible', // visibility: visible у ошибки
  errorElement: '.popup__input-error' // span ошибки
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupCloseByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupCloseByEscape);
}

closeButtons.forEach(item => {
  const closestPopup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(closestPopup));
  //закрытие модалок по оверлею
  closestPopup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    }
  });
});


function popupCloseByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
}

// Открытие попапа Профиля
editButton.addEventListener('click', () => {
  clearInputsError(profilePopup, editBioValidator)
  titleInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  openPopup(profilePopup)
});

// Открытие попапа Добавление карточки
addCardButton.addEventListener('click', () => {
  addCardForm.reset()
  clearInputsError(addCardPopup, addCardValidator)
  openPopup(addCardPopup)

  const button = addCardForm.querySelector(config.submitButtonSelector)
  const inputs = Array.from(addCardForm.querySelectorAll(config.inputSelector))
  addCardValidator.toggleButtonState(button, inputs)
})

// submit формы Профиля
function handleEditFormSubmit(evt) {
  profileName.textContent = titleInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function clearInputsError(popup, validator) {
  const inputs = Array.from(popup.querySelectorAll(config.inputSelector))

  inputs.forEach((input) => {
    const errorElement = popup.querySelector(`${config.errorElement}-${input.id}`)
    validator.hideErrorText(errorElement)
  })
}

// submit формы Добавления карточки
function handleAddCardFormSubmit(evt) {

  const newCard = {
    name: nameInput.value,
    link: linkInput.value
  }

  renderCard(newCard)
  closePopup(addCardPopup);
}

// Отрисовка карточки
function renderCard(card) {
  const newCard = new Card(card, '.elements__list', openPopup, previewCardPopup)
  cardList.prepend(newCard.render())
}

// Отрисовка начальных карточек
initialCards.reverse().forEach((card) => {
  renderCard(card)
})

editForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

const addCardValidator = new FormValidator(config, addCardForm)
const editBioValidator = new FormValidator(config, editForm)

addCardValidator.enableValidation()
editBioValidator.enableValidation()

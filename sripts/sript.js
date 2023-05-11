import { Card } from './card.js'
import { config, hideErrorText, toggleButtonState } from './validate.js'

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
};

// Открытие попапа Профиля
editButton.addEventListener('click', () => {
  clearInputsError(profilePopup)
  openPopup(profilePopup)
  titleInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
});

// Открытие попапа Добавление карточки
addCardButton.addEventListener('click', () => {
  addCardForm.reset()
  clearInputsError(addCardPopup)
  openPopup(addCardPopup)
  const button = addCardForm.querySelector(config.submitButtonSelector)
  const inputs = Array.from(addCardForm.querySelectorAll(config.inputSelector))
  toggleButtonState(button, inputs, config)
})

// submit формы Профиля
function handleEditFormSubmit(evt) {

  profileName.textContent = titleInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function clearInputsError(popup) {
  const inputs = Array.from(popup.querySelectorAll(config.inputSelector))

  inputs.forEach((input) => {
    const errorElement = popup.querySelector(`${config.errorElement}-${input.id}`)
    hideErrorText(errorElement, config)
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

// Создание карточки
function createCard(name, link) {
  // Клонируем карточку
  const itemCloneCard = cardTemplate.cloneNode(true)
  const titleElement = itemCloneCard.querySelector('.elements__text')
  const likeElement = itemCloneCard.querySelector('.elements__icon')
  const linkElement = itemCloneCard.querySelector('.elements__picture')
  const trashElement = itemCloneCard.querySelector('.elements__trash')

  // По клику на лайк
  likeElement.addEventListener('click', () => {
    likeElement.classList.toggle('elements__icon-active')
  })

  trashElement.addEventListener('click', () => {
    itemCloneCard.remove()
  })
  // По клику на картинку
  linkElement.addEventListener('click', () => {
    openPopup(previewCardPopup)
    previewPopupImage.src = link
    previewPopupImage.alt = name
    previewPopupText.textContent = name
  })

  titleElement.textContent = name
  linkElement.src = link
  linkElement.alt = name

  return itemCloneCard
}

// Отрисовка карточки
function renderCard(card) {
  const newCard = new Card(card, '.elements__list')
  cardList.prepend(newCard.render())
}

// Отрисовка начальных карточек
initialCards.reverse().forEach((card) => {
  renderCard(card)
})

editForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);



// function fn(card, cardSelector) {
//   const template = document.querySelector(cardSelector)
// }
// const card1 = {
//   name: 'Relax Time',
//   link: 'https://images.unsplash.com/photo-1639224197881-c835df14ed26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
// }

// fn(card1, '.elements__list')

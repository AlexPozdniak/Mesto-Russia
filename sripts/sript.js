const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__container');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.popup__save-button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job');

const popupToggle = function () {
  popup.classList.toggle('popup_opened');
}

const namePlaceholder = profile__name.textContent;
const jobPlaceholder = profile__job.textContent;

nameInput.setAttribute('value', namePlaceholder);
jobInput.setAttribute('value', jobPlaceholder);

function formSubmitHandler (evt) {

  evt.preventDefault();

  const profileName = document.querySelector('.profile__name');
  const profileJob = document.querySelector('.profile__job');

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupToggle();
}

popupForm.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let name = document.querySelector('.profile__heading');
let job = document.querySelector('.profile__subheading');
function openPopup () {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
}

function closePopup () {
    popup.classList.remove('popup_opened');

}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
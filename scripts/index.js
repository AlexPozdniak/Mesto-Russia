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
    document.querySelector('.popup__text_name').value = document.querySelector('.profile__heading').textContent;
    document.querySelector('.popup__text_profession').value = document.querySelector('.profile__profession').textContent;
}

function closePopup () {
    popup.classList.remove('popup_opened');
document.querySelector('.popup__text_name').value = document.querySelector('.profile__heading').textContent;
    document.querySelector('.popup__text_profession').value = document.querySelector('.profile__profession').textContent;
}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameInputValue = nameInput.value;
    jobInputValue = jobInput.value;
    name.textContent = nameInputValue;
    job.textContent = jobInputValue;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled', // класс заблокированной кнопки
  inputErrorClass: 'popup__input_type_error', // класс невалидного инпута ( __ red)
  errorClass: 'popup__error_visible', // visibility: visible у ошибки
  errorElement: '.popup__input-error' // span ошибки
}

// Показываем ошибку
function showErrorText(errorElement, config, input) {
  // Назначаем текст для ошибки
  errorElement.textContent = input.validationMessage
  // Показываем ошибку
  errorElement.classList.add(config.errorClass)
}

// Скрываем ошибку
export function hideErrorText(errorElement, config) {
  errorElement.textContent = ''
  errorElement.classList.remove(config.errorClass)
}

// Проверяем все инпуты на валидность. Вернёт true если хотя бы один инпут невалиден
function isInputsInvalid(inputs) {
  return inputs.some((input) => !input.validity.valid)
}

// Делаем кнопку заблокированной
function setButtonDisabled(button, config) {
  button.disabled = true
  button.classList.add(config.inactiveButtonClass)
}

// Делаем кнопку активной
function setButtonEnabled(button, config) {
  button.disabled = false
  button.classList.remove(config.inactiveButtonClass)
}

// Состояние кнопки
export function toggleButtonState(button, inputs, config) {
  if (isInputsInvalid(inputs)) { // Если хотя бы 1 инпут невалиден
    setButtonDisabled(button, config)
  } else {
    setButtonEnabled(button, config)
  }
}

// Валидация инпута
function validateInput(form, input, config) {
  const errorElement = document.querySelector(`${config.errorElement}-${input.id}`)

  if (input.validity.valid) { // Если инпут валиден
    // убираем __ red у инпута
    input.classList.remove(config.inputErrorClass)
    hideErrorText(errorElement, config)
    // Разблокировать кнопку

  } else { // Если есть ошибка
    // показываем __ red у инпута
    input.classList.add(config.inputErrorClass)
    showErrorText(errorElement, config, input)
    // Заблокировать кнопку

  }
}

// Назначаем слушатель событий на каждый инпут и состояние кнопки
function setInputListeners(form, config) {
  // Массив инпутов у формы
  const inputs = Array.from(form.querySelectorAll(config.inputSelector))
  const button = form.querySelector(config.submitButtonSelector)

  // При открытии модального окна
  toggleButtonState(button, inputs, config)

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(form, input, config)
      toggleButtonState(button, inputs, config)
    })
  })

}

// Запуск валидации на все формы
function enableValidation(config) {
  // Массив всех форм
  const forms = Array.from(document.querySelectorAll(config.formSelector))

  forms.forEach((form) => {
    setInputListeners(form, config)

    form.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  })
}



enableValidation(config);


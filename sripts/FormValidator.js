export class FormValidator {
  constructor(config, form) {
    this.form = form
    this.config = config
    this.inputs = Array.from(this.form.querySelectorAll(this.config.inputSelector))
  }

  #showErrorText(errorElement, input) {
    // Назначаем текст для ошибки
    errorElement.textContent = input.validationMessage
    // Показываем ошибку
    errorElement.classList.add(this.config.errorClass)
  }

  hideErrorText(errorElement) {
    errorElement.textContent = ''
    errorElement.classList.remove(this.config.errorClass)
  }

  #isInputsInvalid() {
    return this.inputs.some((input) => !input.validity.valid)
  }

  #setButtonDisabled(button) {
    button.disabled = true
    button.classList.add(this.config.inactiveButtonClass)
  }

  #setButtonEnabled(button) {
    button.disabled = false
    button.classList.remove(this.config.inactiveButtonClass)
  }

  toggleButtonState(button) {
    if (this.#isInputsInvalid(this.inputs)) { // Если хотя бы 1 инпут невалиден
      this.#setButtonDisabled(button)
    } else {
      this.#setButtonEnabled(button)
    }
  }

  #validateInput(input) {
    const errorElement = document.querySelector(`${this.config.errorElement}-${input.id}`)

    if (input.validity.valid) { // Если инпут валиден
      // убираем __ red у инпута
      input.classList.remove(this.config.inputErrorClass)
      this.hideErrorText(errorElement)
      // Разблокировать кнопку

    } else { // Если есть ошибка
      // показываем __ red у инпута
      input.classList.add(this.config.inputErrorClass)
      this.#showErrorText(errorElement, input)
      // Заблокировать кнопку

    }
  }

  // Назначаем слушатель событий на каждый инпут и состояние кнопки
  #setInputListeners() {
    // Массив инпутов у формы
    const button = this.form.querySelector(this.config.submitButtonSelector)

    // При открытии модального окна
    this.toggleButtonState(button, this.inputs)

    this.inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.#validateInput(input)
        this.toggleButtonState(button, this.inputs)
      })
    })

  }

  enableValidation() {
    this.#setInputListeners()

    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  }
}

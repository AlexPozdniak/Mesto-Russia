export class FormValidator {
  constructor(config, form) {
    this._form = form
    this._config = config
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    this._button = this._form.querySelector(this._config.submitButtonSelector)
  }

  #showErrorText(errorElement, input) {
    // Назначаем текст для ошибки
    errorElement.textContent = input.validationMessage
    // Показываем ошибку
    errorElement.classList.add(this._config.errorClass)
    // показываем __ red у инпута
    input.classList.add(this._config.inputErrorClass)
  }

  #hideErrorText(errorElement, input) {
    errorElement.textContent = ''
    errorElement.classList.remove(this._config.errorClass)
    input.classList.remove(this._config.inputErrorClass)
  }

  hideErrors() {
    this._inputs.forEach((input) => {
      const errorElement = this._form.querySelector(`${this._config.errorElement}-${input.id}`)
      this.#hideErrorText(errorElement, input)
    })
  }

  toggleButtonState() {
    const hasInvalidInput = this._inputs.some((input) => !input.validity.valid);
    this._button.disabled = hasInvalidInput;
  }

  #validateInput(input) {
    const errorElement = this._form.querySelector(`${this._config.errorElement}-${input.id}`)

    if (input.validity.valid) { // Если инпут валиден
      this.#hideErrorText(errorElement, input)
      // Разблокировать кнопку
    } else { // Если есть ошибка
      this.#showErrorText(errorElement, input)
      // Заблокировать кнопку
    }
  }

  // Назначаем слушатель событий на каждый инпут и состояние кнопки
  enableValidation() {
    // При открытии модального окна
    this.toggleButtonState()

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.#validateInput(input)
        this.toggleButtonState()
      })
    })

  }
}

import Popup from "./Popup";

export class PopupWithDeletion extends Popup {
  constructor(selector) {
    super(selector);
    this._confirmButton = this._popup.querySelector('.popup__save-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._confirm();
    });
  }

  getConfirm(callback) {
    this._confirm = callback;
  }
}

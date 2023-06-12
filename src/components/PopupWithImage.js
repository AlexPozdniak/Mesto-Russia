import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImg = this._popup.querySelector(".popup__image");
    this._popupDescr = this._popup.querySelector(".popup__text");
  }
  open(name, link) {
    super.open();

    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupDescr.textContent = name;
  }
}

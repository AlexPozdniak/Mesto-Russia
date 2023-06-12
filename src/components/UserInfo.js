export default class UserInfo {
  constructor(selectors) {
    this._profileName = document.querySelector(selectors.username);
    this._profileDescr = document.querySelector(selectors.userDescr);
    this._avatar = document.querySelector(selectors.avatar);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileDescr.textContent,
      avatar: this._avatar.src,
    };
  }
  setUserInfo(item) {
    this._profileName.textContent = item.name;
    this._profileDescr.textContent = item.about;
    this.userId = item._id;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}

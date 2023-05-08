export default class UserInfo {
  constructor({ usernameSelector, usersubtitleSelector, avatarSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._usersubtitle = document.querySelector(usersubtitleSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      subtitle: this._usersubtitle.textContent,
    };
  }

  setUserInfo(data) {
    (this._username.textContent = data.name),
      (this._usersubtitle.textContent = data.about);
    this._avatar.src = data.avatar;
    this._userId = data._id;
  }

  getUserId() {
    return this._userId;
  }
}

export default class UserInfo {
  constructor({ usernameSelector, usersubtitleSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._usersubtitle = document.querySelector(usersubtitleSelector);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      subtitle: this._usersubtitle.textContent
    };
  }

  setUserInfo(username, subtitle) {
    (this._username.textContent = username), (this._usersubtitle.textContent = subtitle);
  }
}

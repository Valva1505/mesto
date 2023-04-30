export default class UserInfo {
    constructor({ name, description, avatar }) {
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
        this._avatar = document.querySelector(avatar);
    }
    getUserInfo() {// при открытии
        return  {
            name: this._name.textContent,
            description: this._description.textContent
        }
        ;
    }
    setUserInfo({ name, description, avatar }) {// при сохранении
        this._name.textContent = name;
        this._description.textContent = description;
        this._avatar.src = avatar;
    }
}

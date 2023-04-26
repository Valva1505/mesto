export default class UserInfo {
    constructor({ name, description }) {
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
    }
    getUserInfo() {// при открытии
        return  {
            name: this._name.textContent,
            description: this._description.textContent
        }
        ;
    }
    setUserInfo({ name, description }) {// при сохранении
        this._name.textContent = name;
        this._description.textContent = description;
    }
}

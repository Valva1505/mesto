export default class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
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

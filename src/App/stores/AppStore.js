import { observable, computed, action } from 'mobx';

export default class AppStore {
    constructor({ count, name } = { count: 0, name: 'Jokcy' }) {
        this.count = count;
        this.name = name;
    }

    @observable count;

    @observable name;

    @computed get msg() {
        return `${this.name} say count is ${this.count}`; /* eslint-disable-line */
    }

    @action add() {
        this.count += 1;
    }

    @action changeName(name) {
        this.name = name;
    }

    toJson() {
        return {
            count: this.count,
            name: this.name,
        };
    }
}

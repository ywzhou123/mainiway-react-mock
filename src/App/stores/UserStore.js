import { observable, computed, action } from 'mobx';
import Fetch from '../routes/fetch';

export default class UserStore {
    @observable isLogin = false;
    @observable loading = false;

    @action fetchLogin(pm) {
        this.loading = true;
        return Fetch.auth(pm).then(json => {
            let { token } = json;
            if (token) {
                this.isLogin = true;
                // setCookie('Authorization', `Token ${token}`);
                // setJsonHead('Authorization');
            }
            this.loading = false;
            return json;
        });
    }

    @action fetchLogout() {
        this.isLogin = false;
    }
}
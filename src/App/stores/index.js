import AppStore from './AppStore';
import UserStore from './UserStore';
import MockStore from './MockStore';

export default {
    appStore: new AppStore(),
    userStore: new UserStore(),
    mockStore: new MockStore(),
};
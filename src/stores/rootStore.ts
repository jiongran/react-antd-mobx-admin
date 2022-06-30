import { AppStore } from './modules/appStore'
import { TabStore } from './modules/tabStore'
import { UserStore } from './modules/userStore'
export default class RootStore {
    App: AppStore;
    Tab: TabStore;
    User: UserStore;
    constructor(){
        this.App = new AppStore()
        this.Tab = new TabStore()
        this.User = new UserStore()
    }
}
import { action, computed, makeObservable, observable } from "mobx"
import BaseStore from '../baseStore'

export interface ITabStore {
    curTab: any[]
    currentTab?: string | undefined
    status?: 'idle' | 'loading'
    reloadPath: string
}

export class TabStore extends BaseStore implements ITabStore {
    curTab = []
    currentTab = undefined
    reloadPath = 'null'
    constructor() {
        super()
        makeObservable(this, {
            curTab: observable,
            currentTab: observable,
            reloadPath: observable,
            setTabs: action,
            setCurrentTab: action,
            setReloadPath: action,
            extraReducers: action,
            setTabtitle: action,
            selectTabs: computed,
            selectCurrentTab: computed,
            selectReloadPath: computed,
        })
    }

    setTabs(curTab:string) {
        this.updateAttr({
            curTab
        })
    }

    setCurrentTab(currentTab:string) {
        this.updateAttr({
            currentTab
        })
    }

    setReloadPath(reloadPath:string) {
        this.updateAttr({
            reloadPath
        })
    }

    extraReducers(){

    }

    setTabtitle (){
    }

    get selectTabs() {
        return this.curTab
    }

    get selectCurrentTab() {
        return this.currentTab
    }

    get selectReloadPath() {
        return this.reloadPath
    }
}
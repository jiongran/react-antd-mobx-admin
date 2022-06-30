import { action, computed, makeObservable, observable } from "mobx"
import BaseStore from '../baseStore'

export enum EenuMode {
    horizontal = 'horizontal',
    vertical  = 'vertical'
}

export interface IAppStore{
    theme: string
    collapsed: boolean
    menuMode: EenuMode
}

export class AppStore extends BaseStore implements IAppStore {
    theme = 'dark'
    collapsed = false
    menuMode = EenuMode.horizontal
    constructor(){
        super()
        makeObservable(this,{
            theme: observable,
            collapsed: observable,
            menuMode: observable,
            setTheme: action,
            setCollapsed: action,
            setMenuMode: action,
            selectTheme: computed,
            selectCollapsed: computed,
            selectMenuMode: computed
        })
    }

    setTheme(theme:string){
        this.theme = theme
    }

    setCollapsed (collapsed:boolean){
        this.collapsed = collapsed
    }
    
    setMenuMode(menuMode:EenuMode) {
        this.menuMode =menuMode
    }

    get selectTheme(){
        return this.theme
    }
    
    get selectCollapsed (){
        return this.collapsed
    }
    
    get selectMenuMode(){
        return this.menuMode
    }
}
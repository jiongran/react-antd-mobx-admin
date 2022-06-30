import BaseStore from '../baseStore'
import { makeObservable, observable, computed, action } from "mobx"

export interface Permission {
    code: string
    name: string
    description?: string
  }
  
  export interface IUserStore {
    username: string
    displayName?: string
    password?: string
    token: string
    permission: Permission[],
    
  }
  export interface IUserDataStore {
    UserInfo: IUserStore
  }

export class UserStore extends BaseStore implements IUserDataStore {
    // username= '';
    // displayName= '';
    // permission= [];
    // token= '';
    UserInfo = {
        username: '',
        displayName: '',
        permission: [],
        token: ''
    }
    constructor(){
        super()
        makeObservable(this,{
            UserInfo: observable.deep,
            setUserInfo: action,
            selectUserInfo: computed
        })
    }

    setUserInfo(UserInfo:IUserStore){
        this.updateAttr(UserInfo)
    }

    get selectUserInfo(){
       return this.UserInfo
    }

}
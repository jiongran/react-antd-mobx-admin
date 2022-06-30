import { makeObservable, action } from "mobx"

export default class BaseStore {
    constructor(){
        makeObservable(this, {
            updateAttr: action
        })
    }
    updateAttr(obj:object) {
        Object.assign(this, obj)
    }
}
import {createContext} from 'react'
import RootStore from '@/stores/rootStore'

export const store = new RootStore()
declare global {
    interface Object {
        store: object;
    }
}

global.store = store
export const StoreContext = createContext(store)
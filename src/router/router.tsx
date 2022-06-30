import React, { Suspense } from "react"
import Login from "@/pages/login"
import routers from './index'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import LayoutView from "@/layout"
import { StoreContext, store } from '@/context'
import { isEmpty } from "@/utils"
const geTAllRouter = (array: any): any => {
    let allRouters:[] = []
    const forArr = (arr:[]) => {
        for (var i = 0; i < arr.length; i++) {
            const itemData:any = arr[i]['items']
            if (itemData) {
                forArr(itemData)
            } else {
                allRouters.push(arr[i])
            }
        }
    }
    forArr(array)
    return allRouters
}
const RouterView = () => {
    const allRouters = geTAllRouter(routers)
    return (
        <Suspense fallback={<></>}>
            <StoreContext.Provider value={store}>
                <Router>
                    <Switch>
                        <Route exact path={'/login'} component={Login} />
                        <LayoutView>
                            {
                                allRouters.map((item: any) => {
                                    return (
                                        <Route key={item.meta.name} exact={item.extact} path={item.path}>{item.component}</Route>
                                    )
                                })
                            }
                        </LayoutView>
                        <Route path={'/'} exact>
                            <Redirect to={'/home'} />
                        </Route>
                    </Switch>
                </Router>
            </StoreContext.Provider>
        </Suspense>
    )
}


export default RouterView
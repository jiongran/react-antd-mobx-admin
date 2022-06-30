import React, { lazy, ReactNode } from "react"
const Home =lazy(() => import('../pages/home'))
const List =lazy(() => import('../pages/list'))
const List2 =lazy(() => import('../pages/list/list2'))

interface IRouter {
    title: string,
    meta:{
        name: string,
        tabFixed?: boolean
        isCache?: boolean
        hidden?: boolean
        icon?: string,
        isAntdIcon: boolean
    },
    path: string,
    extact?: boolean,
    component?: ReactNode,
    items?: IRouter[]
}

const routers:IRouter[] = [
    {
        title: '首页',
        meta:{
            name: 'Home',
            icon: 'PieChartOutlined',
            isAntdIcon: true
        },
        path: '/home',
        extact: true,
        component: <Home />,
    },
    {
        title: '列表',
        meta:{
            name: 'List',
            icon: 'PieChartOutlined',
            isAntdIcon: true
        },
        path: '/list',
        extact: true,
        items:[
            {
                title: '列表1',
                meta:{
                    name: 'List1',
                    icon: 'PieChartOutlined',
                    isAntdIcon: true
                },
                path: '/list/list1',
                extact: true,
                component: <List />,
            },
            {
                title: '列表2',
                meta:{
                    name: 'List2',
                    icon: 'PieChartOutlined',
                    isAntdIcon: true
                },
                path: '/list/list2',
                extact: true,
                component: <List2 />,
            }
        ]
    }
]

export default routers
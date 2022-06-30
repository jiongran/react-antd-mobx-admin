import ErrorPage from '@/pages/errorpage'
import Home from '@/pages/home'
import List from '@/pages/list'
import List2 from '@/pages/list/list2'
import {
    HomeOutlined
} from '@ant-design/icons'
import { ReactNode } from 'react'

export interface NestedRoute {
    path: string
    routes?: Array<NestedRoute>
}

type MenuType = 'menu' | 'subMenu'

export interface MenuRoute extends NestedRoute {
    // path: string
    name?: string
    routes?: MenuRoute[] | undefined
    authority?: string[] | string
    hideChildrenInMenu?: boolean
    hideInMenu?: boolean
    icon?: string | ReactNode
    locale?: string
    type?: MenuType
    [key: string]: any
}

const routers: MenuRoute[] = [
    {
        path: '/home',
        key: 'Home',
        name: '首页',
        icon: HomeOutlined,
        extact: true,
        component: Home,
    },
    {
        path: '/errorpage',
        key: 'ErrorPage',
        name: '无权限',
        icon: HomeOutlined,
        extact: true,
        component: ErrorPage,
    },
    {
        path: '/list',
        key: 'List',
        name: '列表',
        icon: HomeOutlined,
        extact: true,
        routes: [
            {
                path: '/list/list1',
                key: 'List1',
                name: '列表1',
                icon: HomeOutlined,
                extact: true,
                component: List,
            },
            {
                path: '/list/list2',
                key: 'List2',
                name: '列表2',
                icon: HomeOutlined,
                extact: true,
                component: List2,
            }
        ]
    }
]

export default routers
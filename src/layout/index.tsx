import { useStore } from '@/hooks/useStore'
import { getKeyName, isAuthorized } from '@/utils'
import { Layout } from 'antd'
import React, { Component, FC, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import HeaderView from './component/Header'
import MenuView from './component/Menu'
import TabPanesView from './component/TabPanes'
import './layout.less'

interface PanesItemProps {
    title: string
    content: Component
    key: string
    closable: boolean
    path: string
}
const noNewTab = ['/login'] // 不需要新建 tab的页面
const noCheckAuth = ['/403'] // 不需要检查权限的页面
// 检查权限
const checkAuth = (newPathname: string): boolean => {
    // 不需要检查权限的
    if (noCheckAuth.includes(newPathname)) {
        return true
    }
    const { tabKey: currentKey } = getKeyName(newPathname)
    return isAuthorized(currentKey)
}

const LayoutView: FC = () => {
    const { App,User } = useStore()
    const history = useHistory()
    const { pathname, search } = useLocation()
    const [collapsed, setCollapsed] = useState(App.selectCollapsed)
    const [menuMode, setMenuMode] = useState(App.menuMode)
    const [tabActiveKey, setTabActiveKey] = useState<string>('home')
    const [panesItem, setPanesItem] = useState<any>({})
    const pathRef: RefType = useRef<string>('')
    // const token = User.UserInfo.token
    const token = 11111111111111111
console.log('token',token)
    useEffect(() => {
        if (!collapsed) {
            // 已折叠时,不修改为折叠. 小屏幕依然根据窗体宽度自动折叠.
            App.setCollapsed(document.body.clientWidth <= 1366)
        }

        // 未登录
        if (!token && pathname !== '/login') {
            history.replace({ pathname: '/login' })
            return
        }

        const { tabKey, title, component: Content } = getKeyName(pathname)
        // 新tab已存在或不需要新建tab，return
        if (pathname === pathRef.current || noNewTab.includes(pathname)) {
            setTabActiveKey(tabKey)
            return
        }

        // 检查权限，比如直接从地址栏输入的，提示无权限
        const isHasAuth = checkAuth(pathname)
        if (!isHasAuth) {
            const errorUrl = '/403'
            const {
                tabKey: errorKey,
                title: errorTitle,
                component: errorContent
            } = getKeyName(errorUrl)
            setPanesItem({
                title: errorTitle,
                content: errorContent,
                key: errorKey,
                closable: true,
                path: errorUrl
            })
            pathRef.current = errorUrl
            setTabActiveKey(errorKey)
            history.replace(errorUrl)
            return
        }

        // 记录新的路径，用于下次更新比较
        const newPath = search ? pathname + search : pathname
        pathRef.current = newPath
        setPanesItem({
            title,
            content: Content,
            key: tabKey,
            closable: tabKey !== 'home',
            path: newPath
        })
        setTabActiveKey(tabKey)
    }, [history, pathname, search, token, collapsed])
    return (
        <Layout
            className="container"
            onContextMenu={(e: Event) => e.preventDefault()}
            style={{ display: pathname.includes('/login') ? 'none' : 'flex' }}
        >
            <MenuView menuMode={menuMode} />
            <Layout
                className={`content ${collapsed && menuMode === 'vertical'}&&'collapsed'  ${menuMode !== 'vertical'}&&'horizontal'  `}
            >
                <HeaderView />
                <Layout.Content>
                    <TabPanesView
                        defaultActiveKey="home"
                        panesItem={panesItem}
                        tabActiveKey={tabActiveKey}
                    />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}
export default LayoutView
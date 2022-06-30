
import { useStore } from '@/hooks/useStore'
import Home from '@/pages/home'
import { getKeyName, isAuthorized } from '@/utils'
import { SyncOutlined } from '@ant-design/icons'
import { Alert, Dropdown, Menu, Tabs } from 'antd'
import React, {
    Component, FC, useCallback, useEffect, useRef, useState
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './TabPanes.less'

const { TabPane } = Tabs

const initPane = [
    {
        title: '首页',
        key: 'home',
        content: Home,
        closable: false,
        path: '/'
    }
]

interface Props {
    defaultActiveKey: string
    panesItem: {
        title: string
        content: Component
        key: string
        closable: boolean
        path: string
    }
    tabActiveKey: string
}
const TabPanesView: FC<Props> = (props) => {
    const { defaultActiveKey, panesItem, tabActiveKey } = props

    const history = useHistory()
    const { pathname, search } = useLocation()

    const fullPath = pathname + search
    const { Tab } = useStore()
    const reloadPath = Tab.selectReloadPath
    const curTab: any = Tab.selectCurrentTab
    const [activeKey, setActiveKey] = useState<string>('')
    const [panes, setPanes] = useState(initPane)
    const [selectedPanel, setSelectedPanel] = useState<any>({})
    const [isReload, setIsReload] = useState<boolean>(false)
    const pathRef: RefType = useRef<string>('')
    const isDisabled = () => selectedPanel.key === 'home'
    const preventDefault = (e: CommonObjectType, panel: object) => {
        e.preventDefault()
        setSelectedPanel(panel)
    }
    const storeTabs = useCallback(
        (ps: any): void => {
            const pathArr = ps.map((item: any) => item.path)
            Tab.setTabs(pathArr)
        },
        [Tab.setTabs]
    )
    const resetTabs = useCallback((): void => {
        const initPanes = curTab.reduce(
            (prev: CommonObjectType[], next: string) => {
                const { title, tabKey, component: Content } = getKeyName(next)
                return [
                    ...prev,
                    {
                        title,
                        key: tabKey,
                        content: Content,
                        closable: tabKey !== 'home',
                        path: next
                    }
                ]
            },
            []
        )
        const { tabKey } = getKeyName(pathname)
        setPanes(initPanes)
        setActiveKey(tabKey)
    }, [curTab, pathname])

    // 初始化页面
    useEffect(() => {
        resetTabs()
    }, [resetTabs])

    // tab切换
    const onChange = (tabKey: string): void => {
        setActiveKey(tabKey)
    }

    // 移除tab
    const remove = (targetKey: string): void => {
        const delIndex = panes.findIndex(
            (item: CommonObjectType) => item.key === targetKey
        )
        panes.splice(delIndex, 1)

        // 删除非当前tab
        if (targetKey !== activeKey) {
            const nextKey = activeKey
            setPanes(panes)
            setActiveKey(nextKey)
            storeTabs(panes)
            return
        }

        // 删除当前tab，地址往前推
        const nextPath = curTab[delIndex - 1]
        const { tabKey } = getKeyName(nextPath)
        // 如果当前tab关闭后，上一个tab无权限，就一起关掉
        if (!isAuthorized(tabKey) && nextPath !== '/') {
            remove(tabKey)
            history.push(curTab[delIndex - 2])
        } else {
            history.push(nextPath)
        }
        setPanes(panes)
        storeTabs(panes)
    }

    // tab新增删除操作
    const onEdit = (targetKey: string | any, action: string) =>
        action === 'remove' && remove(targetKey)

    // tab点击
    const onTabClick = (targetKey: string): void => {
        const { path } = panes.filter(
            (item: CommonObjectType) => item.key === targetKey
        )[0]
        history.push({ pathname: path })
    }

    // 刷新当前 tab
    const refreshTab = (): void => {
        setIsReload(true)
        setTimeout(() => {
            setIsReload(false)
        }, 1000)

        Tab.setReloadPath(pathname + search)
        setTimeout(() => {
            Tab.setReloadPath('null')
        }, 500)
    }

    // 关闭其他或关闭所有
    const removeAll = async (isCloseAll?: boolean) => {
        const { path, key } = selectedPanel
        history.push(isCloseAll ? '/' : path)

        const nowPanes =
            key !== 'home' && !isCloseAll ? [...initPane, selectedPanel] : initPane
        setPanes(nowPanes)
        setActiveKey(isCloseAll ? 'home' : key)
        storeTabs(nowPanes)
    }
    const menu = (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => refreshTab()}
                disabled={selectedPanel.path !== fullPath}
            >
                刷新
            </Menu.Item>
            <Menu.Item
                key="2"
                onClick={(e: Event) => {
                    e.stopPropagation()
                    remove(selectedPanel.key)
                }}
                disabled={isDisabled()}
            >
                关闭
            </Menu.Item>
            <Menu.Item
                key="3"
                onClick={(e: Event) => {
                    e.stopPropagation()
                    removeAll()
                }}
            >
                关闭其他
            </Menu.Item>
            <Menu.Item
                key="4"
                onClick={(e: Event) => {
                    e.stopPropagation()
                    removeAll(true)
                }}
                disabled={isDisabled()}
            >
                全部关闭
            </Menu.Item>
        </Menu>
    )
    return (
        <Tabs
            activeKey={activeKey}
            className="tabs"
            defaultActiveKey={defaultActiveKey}
            hideAdd
            onChange={onChange}
            onEdit={onEdit}
            onTabClick={onTabClick}
            type="editable-card"
            size="small"
        >
            {panes.map((pane: CommonObjectType) => (
                <TabPane
                    closable={pane.closable}
                    key={pane.key}
                    tab={
                        <Dropdown
                            overlay={menu}
                            placement="bottomLeft"
                            trigger={['contextMenu']}
                        >
                            <span onContextMenu={(e) => preventDefault(e, pane)}>
                                {isReload &&
                                    pane.path === fullPath &&
                                    pane.path !== '/403' && (
                                        <SyncOutlined title="刷新" spin={isReload} />
                                    )}
                                {pane.title}
                            </span>
                        </Dropdown>
                    }
                >
                    {reloadPath !== pane.path ? (
                        <pane.content path={pane.path} />
                    ) : (
                        <div style={{ height: '100vh' }}>
                            <Alert message="刷新中..." type="info" />
                        </div>
                    )}
                </TabPane>
            ))}
        </Tabs>
    )
}
export default TabPanesView
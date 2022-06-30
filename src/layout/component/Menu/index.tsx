
import logo from '@/assets/img/logo.png'
import Icon from '@/components/Icon'
import { useStore } from '@/hooks/useStore'
import menus from '@/router/index'
import { flattenRoutes, getKeyName } from '@/utils/index'
import { Layout, Menu } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Menu.less'


const { Header } = Layout

const { SubMenu } = Menu
const flatMenu = flattenRoutes(menus)

type MenuType = CommonObjectType<string>

interface MenuProps {
    menuMode: 'horizontal' | 'vertical'
}

const MenuView: FC<MenuProps> = ({ menuMode }) => {
    const { App, User } = useStore()
    const userInfo = User.selectUserInfo
    const collapsed = App.selectCollapsed
    const theme = App.selectTheme
    const { pathname } = useLocation()
    const { tabKey: curKey = 'home' } = getKeyName(pathname)
    const [current, setCurrent] = useState(curKey)
    const { permission = [] } = userInfo

    // 递归逐级向上获取最近一级的菜单，并高亮
    const higherMenuKey = useCallback(
        (checkKey = 'home',  pathname:any):any => {
            if (
                checkKey === '403' ||
                flatMenu.some((item: MenuType) => item.key === checkKey)
            ) {
                return checkKey
            }
            const higherPath = pathname.match(/(.*)\//g)[0].replace(/(.*)\//, '$1')
            const { tabKey } = getKeyName(higherPath)
            return higherMenuKey(tabKey, higherPath)
        },
        [pathname]
    )

    useEffect(() => {
        const { tabKey } = getKeyName(pathname)
        const higherKey = higherMenuKey(tabKey,pathname)
        setCurrent(higherKey)
    }, [higherMenuKey, pathname])

    // 菜单点击事件
    const handleClick = (item: any): void => {
        setCurrent(item.key)
    }

    // 子菜单的标题
    const subMenuTitle = (data: MenuType): JSX.Element => {
        const { icon: MenuIcon, iconfont } = data
        return (
            <div className="flex items-center">
                {iconfont ? <Icon type={iconfont} /> : !!MenuIcon && <MenuIcon />}
                <span className="noselect">{data.name}</span>
            </div>
        )
    }

    // 创建可跳转的多级子菜单
    const createMenuItem = (data: MenuType): JSX.Element => {
        return (
            <Menu.Item className="noselect" key={data.key} title={data.name}>
                <Link to={data.path}>{subMenuTitle(data)}</Link>
            </Menu.Item>
        )
    }

    // 创建可展开的第一级子菜单
    const creatSubMenu = (data: CommonObjectType): JSX.Element => {
        let menuItemList: any = []
        data.routes.map((item: MenuType) => {
            const arr = permission.filter((ele:any) => item.key === ele.code)
            if (arr.length > 0) {
                menuItemList.push(renderMenu(item))
            }
            return arr
        })

        return menuItemList.length > 0 ? (
            <SubMenu key={data.key} title={subMenuTitle(data)}>
                {menuItemList}
            </SubMenu> as any
        ) : null
    }

    // 创建菜单树
    const renderMenuMap = (list: CommonObjectType): JSX.Element[] =>
        list.map((item: any) => renderMenu(item))

    // 判断是否有子菜单，渲染不同组件
    function renderMenu(item: MenuType) {
        return item.type === 'subMenu' ? creatSubMenu(item) : createMenuItem(item)
    }

    const setDefaultKey = flatMenu
        .filter((item: MenuType) => item.type === 'subMenu')
        .reduce((prev: MenuType[], next: MenuType) => [...prev, next.key], [])

    const showKeys = collapsed ? [] : setDefaultKey
    const LogLink = () => (
        <Link to={{ pathname: '/' }}>
            <div className="flex items-center logo">
                <img alt="logo" src={logo} width="32" />
                {!collapsed && <h1>Antd多页签模板</h1>}
            </div>
        </Link>
    )
    if (menuMode === 'horizontal')
        return (
            <Header className="flex header">
                <LogLink />
                <div className="autoWidthMenu">
                    <Menu
                        mode="horizontal"
                        onClick={handleClick}
                        selectedKeys={[current]}
                        theme={theme === 'default' ? 'light' : 'dark'}
                    >
                        {renderMenuMap(menus)}
                    </Menu>
                </div>
            </Header>
        )
    return (
        <Layout.Sider
            collapsed={collapsed}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                userSelect: 'none'
            }}
            width={220}
        >
            <LogLink />
            <Menu
                defaultOpenKeys={showKeys}
                mode="inline"
                onClick={handleClick}
                selectedKeys={[current]}
                theme={theme === 'default' ? 'light' : 'dark'}
            >
                {renderMenuMap(menus)}
            </Menu>
        </Layout.Sider>
    )
}

export default MenuView
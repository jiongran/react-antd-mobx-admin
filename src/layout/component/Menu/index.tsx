
import React, { FC, useState, useEffect } from 'react'
import Icon from '@/components/Icon'
import * as adIcon from '@ant-design/icons'
import { Menu } from 'antd'
import { getTreePath } from '@/utils'
const { Item, SubMenu } = Menu

const MenuView:FC<any> = props => {
    const { collapsed, routers, history } = props
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([])
    // useEffect(() => {
    //     setSelectedKeys([history.location.pathname])
    // }, [history.location.pathname])
    // const { pathname } = history.location
    const pathname = '/home'
    const defaultOpenKeys = getTreePath(routers, (route: any) => route.path === pathname, 'items').map(
        (route: any) => route.path,
    )
    const handleClickMenu = (menu: any) => {
        history.push(menu.path)
    }

    const renderIcon = (item: any) => {
        if (!item.meta.isAntdIcon) {
            return <Icon type={item.meta.icon} />
        } else {
            return React.createElement(adIcon && (adIcon as any)[item.meta.icon])
        }
    }
    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?:any,
      ) {
        return {
          key,
          icon,
          children,
          label
        }
      }

    const renderMenuItem = (item: any):any => {
        if (!item.items) {
            return (
                <Item key={item.meta.name} title={item.title} icon={renderIcon(item)} onClick={()=>handleClickMenu(item)} >
                    {item.title}
                </Item>

            )
            // return getItem(item.title,item.meta.name,renderIcon(item))
        } else {
            return (
                <SubMenu key={item.meta.name} title={item.title} icon={renderIcon(item)}>
                    {
                       renderMenuList(item.items)
                    }
                </SubMenu>
            )

            // return getItem(item.title,item.meta.name,renderIcon(item), renderMenuItem(item.items))
        }
    }
    const renderMenuList = (array: any) => {
        return array.map((item: any) => renderMenuItem(item))
    }
    return (
        <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKeys}
            inlineCollapsed={collapsed}
            defaultOpenKeys={defaultOpenKeys}
            onClick={handleClickMenu}
            children={renderMenuList(routers)}
            />
    )
}
export default MenuView
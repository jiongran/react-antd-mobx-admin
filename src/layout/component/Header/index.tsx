import { useStore } from '@/hooks/useStore'
import Breadcrumb from '@/layout/component/Breadcrumb'
import { EenuMode } from '@/stores/modules/appStore'
import { CheckOutlined, LoadingOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Dropdown, Layout, Menu } from 'antd'
import React, { useState } from 'react'
import './Header.less'

const HeaderView = () => {
    const {App} = useStore()
    const [loading,setLoading] = useState(false)
    const [collapsed, setCollapsed] = useState(App.selectCollapsed)
    const [menuMode, setMenuMode] = useState(App.menuMode)
    const firstWord = 'aaaa'
    const username ='ssssss'
    const toggle = () => {
        setCollapsed(!collapsed)
        App.setCollapsed(!setCollapsed)
    }
    const logout = ()=>{}
    const menu = (
        <Menu>
          <Menu.Item onClick={logout}>
            <span className="ant-btn-link">退出登录</span>
            {loading && <LoadingOutlined />}
          </Menu.Item>
        </Menu>
      )
      const setting = (
        <Menu>
          <Menu.Item>
              <div className="layoutCheckIndicator">
                  <span onClick={() => App.setMenuMode(EenuMode.vertical)}>垂直布局</span>
                <CheckOutlined
                  className={`${menuMode === 'vertical'} && 'checkboxItem'`}
                />
            </div>
          </Menu.Item>
          <Menu.Item>
              <div className="layoutCheckIndicator">
              <span onClick={() => App.setMenuMode(EenuMode.horizontal)}>水平布局</span>
                <CheckOutlined
                  className={`${menuMode === 'horizontal'} && 'checkboxItem'`}
                />
            </div>
          </Menu.Item>
        </Menu>
      )
    
    return (
        <Layout.Header
        className="header"
        >
        {menuMode === 'vertical' && (
            <>
            <div className="toggleMenu" onClick={toggle}>
                {collapsed ? (
                <MenuUnfoldOutlined className="trigger" />
                ) : (
                <MenuFoldOutlined className="trigger"/>
                )}
            </div>
            {/* 面包屑 */}
            <Breadcrumb />
            </>
        )}

        {/* 右上角 */}
        <Dropdown className="fr content" overlay={menu}>
            <span className="user">
            <span className="avart">{firstWord}</span>
            <span>{username}</span>
            </span>
        </Dropdown>
        <Dropdown className="fr content" overlay={setting}>
            <span className="preference">
                布局设置
            </span>
        </Dropdown>
        </Layout.Header>
    )
}
export default HeaderView
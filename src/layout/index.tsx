import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Layout } from 'antd'
import React, {FC, useState } from 'react'
import Logo from '@/assets/img/logo.png'
import routers from '@/router/index'
import Menu from './component/Menu'
import './layout.less'
import { useHistory } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const LayoutView:FC<any> = props => {
    const { username, aliveControl, onClickDrop} = props
    const history = useHistory()
    const [collapsed, setCollapsed] = useState(false)
    return (
        <Layout className='allHeight'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logoWrap">
                    <img alt="" className="logo" src={Logo} />
                   {
                    !collapsed?<span className="loginTxt">云客服</span>:null
                   }
                </div>
                <Menu collapsed={collapsed} routers={routers} history={history} />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <span className='collapsed'>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </span>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                   {props.children}
                </Content>
            </Layout>
        </Layout>
    );
}
export default LayoutView
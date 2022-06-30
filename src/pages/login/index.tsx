import React, { FC, useEffect, useRef, useState } from "react"
import Logo from '@/assets/img/logo.png'
import { UserOutlined, LockOutlined, SafetyOutlined, VerifiedOutlined } from '@ant-design/icons'
import { Form, Input, Button } from 'antd'
import './login.less'
const Login: FC = () => {
    const [form] = Form.useForm()
    const code = useRef(null) as any
    const [isShowGoggleTotpCode, setIsShowGoggleTotpCode] = useState(false)
    const getComputedStyle = () => {
        code.current.src = 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF'
    }
    const onFinish = () => {

    }
    useEffect(()=>{
        getComputedStyle()
    },[])
    const FormView = () => {
        return (
            <Form
                form={form}
                initialValues={{}}
                className="login-form"
                name="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input placeholder="用户名" prefix={<UserOutlined />} size="large" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password
                        placeholder="密码"
                        prefix={<LockOutlined />}
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="code"
                    rules={[{ required: true, message: '请输入验证码' }]}
                >
                    <Input
                        placeholder="验证码"
                        size="large"
                        prefix={<SafetyOutlined />}
                        suffix={
                            <img ref={code} className="code" alt="查看验证码" onClick={() => getComputedStyle()} />
                        }
                    />
                </Form.Item>
                {
                    isShowGoggleTotpCode &&
                    <Form.Item
                        name="totpCode"
                        rules={[{ required: true, message: '请输入谷歌验证码' }]}
                    >
                        <Input
                            placeholder="谷歌验证码"
                            size="large"
                            prefix={<VerifiedOutlined />}
                        />
                    </Form.Item>
                }
                <Form.Item>
                    <Button
                        className="login-form-button"
                        htmlType="submit"
                        size="large"
                        type="primary"
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        )
    }
    return (
        <div className="login-layout" id="login-layout">
            <div className="logo-box">
                <img alt="" className="logo" src={Logo} />
                <span className="logo-name">云客服</span>
            </div>
            {FormView()}
        </div>
    )
}

export default Login

// export default class Login extends React.Component {

// }
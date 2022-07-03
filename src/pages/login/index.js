import req from '@/api/req'
import { setUserInfoAction } from "@/store/user/action"
import { saveToken } from "@/utils"
import { api, setApi, validLength6 } from '@/utils/formValid'
import { jsonUtils } from '@/utils/modules'
import { LockOutlined, SafetyOutlined, UserOutlined, VerifiedOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from "antd"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import "./index.less"
const uuid = require('uuid')
const IPT_RULE_USERNAME = [
    {
        required: true,
        message: "请输入用户名",
    },
];

const IPT_RULE_PASSWORD = [
    {
        required: true,
        message: "请输入密码",
    },
    {
        validator: validLength6
    }
];

const IPT_RULE_CODE = [
    {
        required: true,
        message: "请输入验证码",
    },
]

const IPT_RULE_TOTPCODE = [
    { required: true, message: '请输入谷歌验证码' }
]

function useLogin(setUserInfo, uuid) {
    const [btnLoad, setBtnLoad] = useState(false);
    const onFinish = async (values) => {
        setBtnLoad(true)
        try {
            const result = await req("member/login", {
                ...values,
                uuid
            })
            if (result.resultCode !== 200) return
            const { data } = result
            setBtnLoad(false)
            saveToken(data.oAuth.token)
            message.success('登录成功')
            setUserInfo({ ...data.user, isLogin: true })
        } catch (e) {
            setBtnLoad(false);
        }
    };
    return { btnLoad, onFinish }
}

function Login() {
    console.log('before',api)
    setApi({a1:'s',a8:'18'})
    console.log('after',jsonUtils.stringify(api))
    const dispatch = useDispatch()
    const setUserInfo = useCallback((info) => dispatch(setUserInfoAction(info)), [dispatch])
    const [form] = Form.useForm();
    const [isShowGoggleTotpCode, setIsShowGoggleTotpCode] = useState(false)
    const [$uuid, set$uuid] = useState('')
    const { btnLoad, onFinish } = useLogin(setUserInfo, $uuid);
    const code = useRef(null)
    const getCode = async (e) => {
        e && e.stopPropagation();
        const _uuid = uuid.v4().replace(/-/g, "")
        const result = await req("open/getCode", {
            uuid: _uuid
        })
        const url = window.URL.createObjectURL(result.data)
        code.current.src = url
        set$uuid(_uuid)
    }
    const getIsOpenTotpCode = async () => {
        var username = form.getFieldValue('username')
        if (username) {
            const res = await req("member/getIsOpenTotpCode", { username })
            if (res.resultCode !== 200) return
            setIsShowGoggleTotpCode(!!res.data)
        }
    }
    useEffect(() => {
        getCode()
    }, [])
    return (
        <div className="login-container">
            <div className="wrapper">
                <div className="title">cloudChat</div>
                <Form
                    form={form}
                    className="login-form"
                    initialValues={{}}
                    onFinish={onFinish}
                >
                    <Form.Item name="username" rules={IPT_RULE_USERNAME}>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="请输入帐号"
                            onBlur={() => getIsOpenTotpCode()}
                        />
                    </Form.Item>
                    <Form.Item name="password" rules={IPT_RULE_PASSWORD}>
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item name="code" rules={IPT_RULE_CODE}>
                        <Input
                            placeholder="请输入验证码"
                            prefix={<SafetyOutlined />}
                            suffix={
                                <img ref={code} className="code" alt="查看验证码" onClick={(e) => getCode(e)} />
                            }
                        />
                    </Form.Item>
                    {
                        isShowGoggleTotpCode &&
                        <Form.Item
                            name="totpCode"
                            rules={IPT_RULE_TOTPCODE}
                        >
                            <Input
                                placeholder="请输入谷歌验证码"
                                size="large"
                                prefix={<VerifiedOutlined />}
                            />
                        </Form.Item>
                    }
                    <Form.Item className="btns">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            loading={btnLoad}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;

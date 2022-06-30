import { Result } from 'antd'
import React, { FC } from 'react'

const ErrorPage: FC = () => (
  <Result
    style={{ height: '100vh' }}
    status="403"
    title="403"
    subTitle="抱歉，您无权访问此页面，如有疑问请联系管理员！"
  />
)

export default ErrorPage
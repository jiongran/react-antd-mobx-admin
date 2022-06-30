
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="react-router-dom" />

declare module 'antd'
declare module '@ant-design/icons'
declare module "classnames" {
    import classNames from 'classnames'
    export default classNames
}
declare global {
    interface Any {
        store: object;
    }
}

type RefType = MutableRefObject<any> | ((instance: any) => void)

type CommonObjectType<T = any> = Record<string, T>


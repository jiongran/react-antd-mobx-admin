/** @format */

import * as React from 'react'
import {createFromIconfontCN} from '@ant-design/icons'


export interface IconProps {
  type: string
  title?: string
  className?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const Icon = createFromIconfontCN({
    scriptUrl:require('./iconfont.js')
})
export default Icon
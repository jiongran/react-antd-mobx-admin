/** @format */

import { createFromIconfontCN } from '@ant-design/icons'
import * as React from 'react'


export interface IconProps {
  type: string
  title?: string
  className?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const Icon = createFromIconfontCN({
    scriptUrl:require('//at.alicdn.com/t/font_1830242_6vhnrbj73u5.js')
})
export default Icon
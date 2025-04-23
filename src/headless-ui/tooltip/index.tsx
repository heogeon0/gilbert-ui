import React, { useRef } from 'react'

import useStyleInView from '@/hooks/useStyleInView.ts'

type Props = {
  /** 부모 영역 */
  children: React.ReactNode
  tooltip: React.ReactNode
}

const position = {}

const Tooltip = ({ children, tooltip }: Props) => {
  const wrapperRef = useRef(null)
  const targetRef = useRef(null)
  const style = useStyleInView(wrapperRef, targetRef, position)
  return (
    <details>
      <summary data-tooltip-sumary ref={wrapperRef}>
        {children}
      </summary>
      <div ref={targetRef} style={style}>
        {tooltip}
      </div>
    </details>
  )
}

export default Tooltip

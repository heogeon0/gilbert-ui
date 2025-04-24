import React, { useRef } from 'react'

import useStyleInView from '@/hooks/useStyleInView.ts'

type Props = {
  /** 부모 영역 */
  children: React.ReactNode
  tooltip: React.ReactNode
}

const position = {
  top: '100%',
  bottom: 20,
  left: 0,
  right: 0,
}

const Tooltip = ({ children, tooltip }: Props) => {
  const wrapperRef = useRef(null)
  const targetRef = useRef(null)
  const style = useStyleInView(wrapperRef, targetRef, position)

  return (
    <details>
      <summary data-tooltip-sumary ref={wrapperRef}>
        {children}
      </summary>
      <div
        ref={targetRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          ...style,
          position: 'absolute',
          backgroundColor: 'black',
          color: 'white',
          padding: '5px',
          borderRadius: '3px',
        }}
      >
        {tooltip}
      </div>
    </details>
  )
}

export default Tooltip

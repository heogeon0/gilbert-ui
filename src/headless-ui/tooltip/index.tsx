import React, { SyntheticEvent, useEffect, useRef } from 'react'

import { useSingleOpen } from '@/context/singleOpenContext.tsx'
import useStyleInView from '@/hooks/useStyleInView.ts'

type Props = {
  /** 툴팁 고유의 아이디 */
  id: string
  /** 부모 영역 */
  children: React.ReactNode
  /** 툴팁 영역 */
  tooltip: React.ReactNode
  /** 호버로 열릴지 여부 (기본값은 false이며, 클릭했을 시 열림) */
  openByHover?: boolean
}

const position = {
  top: '100%',
  bottom: 20,
  left: 0,
  right: 0,
}

const Tooltip = ({ children, tooltip, id, openByHover }: Props) => {
  const observeRef = useRef(null)
  const wrapperRef = useRef(null)
  const style = useStyleInView(wrapperRef, observeRef, position)
  const [isOpen, toggle] = useSingleOpen(id)

  /** 특정 요소를 클릭했을 때 툴팁을 열거나 닫는 함수 */
  const handleClick = (e: SyntheticEvent) => {
    if (openByHover) return
    e.stopPropagation()
    toggle((prev) => (prev === id ? null : id))
  }

  /** 마우스 오버시 툴팁을 열도록 설정 */
  const handleMouseOver = (e: SyntheticEvent) => {
    if (openByHover) {
      e.stopPropagation()
      toggle(id)
    }
  }

  /** 마우스 아웃시 툴팁을 닫도록 설정 */
  const handleMouseOut = (e: SyntheticEvent) => {
    if (openByHover) {
      e.stopPropagation()
      toggle(null)
    }
  }

  /** 툴팁이 열려있는 경우, 툴팁 외부를 클릭했을 때, 툴팁이 닫히도록 이벤트 추가 */
  useEffect(() => {
    const close = () => {
      if (openByHover) return
      toggle(null)
    }
    if (isOpen) {
      window.addEventListener('click', close, { once: true })
    }

    return () => {
      window.removeEventListener('click', close)
    }
  }, [isOpen, toggle, openByHover])

  return (
    <div
      style={{ position: 'relative' }}
      ref={observeRef}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
    >
      <div ref={wrapperRef} onClick={handleClick}>
        {children}
      </div>
      {isOpen && (
        <div
          data-target-id={id}
          onClick={(e) => e.stopPropagation()}
          style={{
            ...style,
            position: 'absolute',
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  )
}

export default Tooltip

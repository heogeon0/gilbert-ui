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
}

const position = {
  top: '100%',
  bottom: 20,
  left: 0,
  right: 0,
}

const Tooltip = ({ children, tooltip, id }: Props) => {
  const wrapperRef = useRef(null)
  const targetRef = useRef(null)
  const style = useStyleInView(wrapperRef, targetRef, position)
  const [isOpen, toggle] = useSingleOpen(id)

  /** 특정 요소를 클릭했을 때 툴팁을 열거나 닫는 함수 */
  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    toggle((prev) => (prev === id ? null : id))
  }

  /** 툴팁이 열려있는 경우, 툴팁 외부를 클릭했을 때, 툴팁이 닫히도록 이벤트 추가 */
  useEffect(() => {
    const close = () => toggle(null)
    if (isOpen) {
      window.addEventListener('click', close, { once: true })
    }

    return () => {
      window.removeEventListener('click', close)
    }
  }, [isOpen, toggle])

  return (
    <>
      <div ref={wrapperRef} onClick={handleClick}>
        {children}
      </div>
      {isOpen && (
        <div
          ref={targetRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            ...style,
            position: 'absolute',
          }}
        >
          {tooltip}
        </div>
      )}
    </>
  )
}

export default Tooltip

import React, { useEffect, useRef, useState } from 'react'

import cx from '@/headless-ui/scrollBox/cx.ts'
import useIntersectionObserver, {
  Elem,
} from '@/hooks/useIntersectionObserver.ts'

type OnItemClick<T> = (item: T) => void

type Direction = 'prev' | 'next'
type ScrollBoxProps<T> = {
  itemCount: number
  onItemClick: OnItemClick<T>
  children: React.ReactNode
  ref: React.RefObject<HTMLElement> | null
  leftButtonComponent?: React.ReactNode
  rightButtonComponent?: React.ReactNode
  wrapperClassName?: string
  renderer: (index: number, onClick: OnItemClick<T>) => React.ReactNode
}

const DefaultButtonState = {
  prev: true,
  next: true,
}

const ScrollBox = <T extends { id: string }>({
  wrapperClassName = '',
  renderer,
  itemCount,
  onItemClick,
  leftButtonComponent,
  rightButtonComponent,
}: ScrollBoxProps<T>) => {
  const [buttonEnabled, setButtonEnabled] = useState(DefaultButtonState)
  const watcherRef = useRef<[Elem, Elem]>([null, null])

  const { entries: watcherEntries } = useIntersectionObserver(watcherRef)

  useEffect(() => {
    if (!watcherEntries.length) {
      setButtonEnabled(DefaultButtonState)
      return
    }
    setButtonEnabled((prev) => {
      const newState = { ...prev }

      watcherEntries.forEach((entry) => {
        const direction = (entry.target as HTMLElement).dataset
          .direction as Direction
        newState[direction] = !entry.isIntersecting
      })
      return newState
    })
  }, [watcherEntries])

  console.log('buttonEnabled', buttonEnabled)

  return (
    <div className={cx('scrollBox')}>
      <ul className={cx('scrollBoxList', wrapperClassName)}>
        <li
          data-direction="prev"
          className="prev-observer"
          ref={(el) => {
            watcherRef.current[0] = el
          }}
        ></li>
        {new Array(itemCount).fill(0).map((_, index) => {
          return (
            <li key={`scroll-box-item-${index}`}>
              {renderer(index, onItemClick)}
            </li>
          )
        })}

        <li
          data-direction="next"
          className="next-observer"
          ref={(el) => {
            watcherRef.current[1] = el
          }}
        ></li>
      </ul>
      <div className={cx('buttonWrapper', 'prev', { on: buttonEnabled.prev })}>
        {leftButtonComponent ? (
          leftButtonComponent
        ) : (
          <button
            className={cx('navigationButton')}
            onClick={() => {
              // Handle previous button click
            }}
          >
            이전
          </button>
        )}
      </div>
      <div className={cx('buttonWrapper', 'next', { on: buttonEnabled.next })}>
        {rightButtonComponent ? (
          rightButtonComponent
        ) : (
          <button
            className={cx('navigationButton')}
            onClick={() => {
              // Handle next button click
            }}
          >
            다음
          </button>
        )}
      </div>
    </div>
  )
}

export default ScrollBox

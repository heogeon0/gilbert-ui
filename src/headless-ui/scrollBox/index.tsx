import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import cx from '@/headless-ui/scrollBox/cx.ts'
import useIntersectionObserver, {
  Elem,
} from '@/hooks/useIntersectionObserver.ts'

type OnItemClick<T> = (item: T, scrollFocus: (index: number) => void) => void

type CustomButtonProps = {
  useButton: boolean
  leftCustomButton?: React.ReactNode
  rightCustomButton?: React.ReactNode
}

type Direction = 'prev' | 'next'
export type ScrollBoxProps<T> = {
  itemCount: number
  onItemClick?: OnItemClick<T>
  ref: React.RefObject<HTMLElement> | null
  customButtonProps: CustomButtonProps
  wrapperClassName?: string
  renderer: (index: number, onClick: OnItemClick<T>) => React.ReactNode
}

const DefaultButtonState = {
  prev: true,
  next: true,
}

const getVisibileEdgeItems = (
  $list: HTMLUListElement,
  $items: (HTMLLIElement | null)[]
) => {
  const { left: lLeft, right: lRight } = $list.getBoundingClientRect()

  const isVisible = ($item: HTMLLIElement | null) => {
    const { left: iLeft, right: iRight } = $item?.getBoundingClientRect() || {
      left: 0,
      right: 0,
    }

    return iLeft >= lLeft && iRight <= lRight
  }

  const leftIndex = Math.max(0, $items.findIndex(isVisible))
  const rightIndex = Math.min(
    $items.length - 1,
    $items.findLastIndex(isVisible)
  )
  const left = $items[leftIndex]
  const right = $items[rightIndex]
  return { left, right }
}

const ScrollBox = <T extends { id: string }>(
  {
    wrapperClassName = '',
    renderer,
    itemCount,
    onItemClick,
    customButtonProps,
  }: ScrollBoxProps<T>,
  ref: ForwardedRef<unknown>
) => {
  const [buttonEnabled, setButtonEnabled] = useState(DefaultButtonState)
  const watcherRef = useRef<[Elem, Elem]>([null, null])

  const listRef = useRef<HTMLUListElement>(null)
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])

  const { entries: watcherEntries } = useIntersectionObserver(watcherRef)

  /**
   * 특정 인덱스의 아이템으로 스크롤 이동
   * @param index 이동할 아이템의 인덱스
   * @param behavior 스크롤 이동 시 애니메이션 유무
   */
  const scrollFocus = useCallback(
    (index: number, behavior: ScrollBehavior = 'instant') => {
      itemsRef.current[index]?.scrollIntoView({
        behavior,
        block: 'nearest',
        inline: 'start',
      })
    },
    []
  )

  /**
   * 이전 또는 다음 버튼 클릭 시 스크롤 이동
   * @param direction 이동 방향
   */
  const move = useCallback((direction: Direction) => {
    console.log(listRef.current)
    if (!listRef.current || !itemsRef.current.length) return

    console.log(itemsRef.current)
    const { left, right } = getVisibileEdgeItems(
      listRef.current,
      itemsRef.current
    )
    const elem = direction === 'prev' ? left : right // 보여지는 맨 끝 아이템!
    elem?.scrollIntoView({
      inline: direction === 'prev' ? 'end' : 'start', // 가로위치 'start' | 'end' | 'nearest' | 'center'
      block: 'nearest', // 세로위치 'start' | 'end' | 'nearest' | 'center'
      behavior: 'smooth', // 애니메이션 유무. smooth: O / instant: X / auto: 알아서...
    })
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      scrollFocus,
    }),
    []
  )

  /** 버튼 사용여부 */
  const isUseButton = customButtonProps.useButton

  /**
   * 현재 보여지는 아이템에 따라 버튼 활성화 여부 결정
   * @description 뷰포트 내에 있는 아이템이 있는지 여부를 확인하여 버튼 활성화 여부 결정
   */
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

  return (
    <div className={cx('scrollBox')}>
      <ul ref={listRef} className={cx('scrollBoxList', wrapperClassName)}>
        <li
          data-direction="prev"
          className="prev-observer"
          ref={(el) => {
            watcherRef.current[0] = el
          }}
        ></li>
        {new Array(itemCount).fill(0).map((_, index) => {
          return (
            <li
              ref={(elem) => {
                itemsRef.current[index] = elem
              }}
              key={`scroll-box-item-${index}`}
            >
              {renderer(index, onItemClick || (() => {}))}
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
      <div
        onClick={() => {
          move('prev')
        }}
        className={cx('buttonWrapper', 'prev', { on: buttonEnabled.prev })}
      >
        {isUseButton && customButtonProps.leftCustomButton ? (
          customButtonProps.leftCustomButton
        ) : (
          <button className={cx('navigationButton', 'prev')}></button>
        )}
      </div>
      <div
        onClick={() => {
          move('next')
        }}
        className={cx('buttonWrapper', 'next', { on: buttonEnabled.next })}
      >
        {isUseButton && customButtonProps.rightCustomButton ? (
          customButtonProps.rightCustomButton
        ) : (
          <button className={cx('navigationButton', 'next')}></button>
        )}
      </div>
    </div>
  )
}

export default ScrollBox

import { RefObject, useLayoutEffect, useState } from 'react'

import useViewportRect from '@/hooks/useViewportRect.tsx'

type PositionKey = 'left' | 'right' | 'top' | 'bottom'
type Positions = Partial<Record<PositionKey, string | number>>
type Style = Partial<Record<'left' | 'right' | 'top' | 'bottom', number>>

/**
 * 렌더링될 요소(ex: popover, tooltip 등)의 위치를 viewport에 맞게 조정하는 hook
 * @param wrapperRef - 렌더링될 요소의 부모 엘리먼트
 * @param targetRef - 렌더링될 요소
 * @param position - 렌더링될 요소의 위치
 * @returns style - 렌더링될 요소의 위치
 * */
const useStyleInView = (
  wrapperRef: RefObject<HTMLElement>,
  targetRef: RefObject<HTMLElement>,
  position: Positions
) => {
  const viewportRect = useViewportRect()
  const [style, setStyle] = useState<Style>()

  useLayoutEffect(() => {
    if (!wrapperRef.current || !targetRef.current) return

    const wrapperRect = wrapperRef.current.getBoundingClientRect()
    const targetRect = targetRef.current.getBoundingClientRect()

    // verticalKey의 의미는 top인 경우 렌더링 할 요소(tagetRef)의 top 위치를 결정한다는 의미임
    const verticalKey =
      wrapperRect.bottom + targetRect.height < viewportRect.height
        ? 'top'
        : 'bottom'
    const horizontalKey =
      wrapperRect.right + targetRect.width < viewportRect.width
        ? 'left'
        : 'right'

    setStyle({
      [verticalKey]: position[verticalKey] || 0,
      [verticalKey === 'top' ? 'bottom' : 'top']: 'auto',
      [horizontalKey]: position[horizontalKey] || 0,
      [horizontalKey === 'left' ? 'right' : 'left']: 'auto',
    })
  }, [viewportRect, wrapperRef, targetRef, position])

  return style
}

export default useStyleInView

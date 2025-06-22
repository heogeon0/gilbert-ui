import { RefObject, useLayoutEffect, useState } from 'react'

import useViewportRect from '@/hooks/useViewportRect'

type PositionKey = 'left' | 'right' | 'top' | 'bottom'  
type Position = Partial<Record<PositionKey, string | number>>
type Style = Partial<Record<'left' | 'right' | 'top' | 'bottom', number>>

const useStyleInView = (
  /** 팝오버 랩퍼 영역 */
  wrapperRef: RefObject<HTMLElement | null>,
  /** 팝오버 타겟 영역(팝오버를 열게하는 버튼) */
  targetRef: RefObject<HTMLElement | null>,  
  /** 팝오버 위치 */
  position: Position,
  /** 팝오버 위치 타입 */
  positionType: 'absolute' | 'relative' = 'relative',
  /** 팝오버 업데이트 여부 */
  needUpdate: boolean = true,
) => {
  const viewportRect = useViewportRect()
  const [style, setStyle] = useState<Style>({})

  useLayoutEffect(() => {
    if (!needUpdate || !wrapperRef.current || !targetRef.current) return
    const wrapperRect = wrapperRef.current.getBoundingClientRect()
    const targetRect = targetRef.current.getBoundingClientRect()

    console.log(viewportRect, targetRect.top)

    // "기준값". top은 top을 기준으로 아래로 보여주기. bototm은 위로 보여주기.
    const verticalKey =
      targetRect.bottom + wrapperRect.height < viewportRect.height ? 'top' : 'bottom'
    const horizontalKey =
      targetRect.right + wrapperRect.width < viewportRect.width ? 'left' : 'right'


      console.log(verticalKey, horizontalKey)
    /* console.log({
      horizontalKey,
      wrapperRight: wrapperRect.right,
      targetWidth: targetRect.width,
      viewportWidth: viewportRect.width,
    }) */

    if (positionType === 'absolute') {
      const absoluteTop = -viewportRect.top + targetRect.top



      console.log(absoluteTop, viewportRect.top,targetRect.top, viewportRect.height)

      console.log('절대위치', absoluteTop)

      setStyle({
        [verticalKey]:
          verticalKey === 'top'
            ? absoluteTop + targetRect.height + +(position.top || 0)
            : viewportRect.height - absoluteTop + +(position.bottom || 0),
        [verticalKey === 'top' ? 'bottom' : 'top']: 'auto',
        [horizontalKey]:
          horizontalKey === 'left'
            ? targetRect.left - +(position.left || 0)
            : viewportRect.width - targetRect.right + +(position.right || 0),
        [horizontalKey === 'left' ? 'right' : 'left']: 'auto',
      })
      
    } else {
      /* relative이던 기존방식:  */
      setStyle({
        [verticalKey]: position[verticalKey] || 0,
        [verticalKey === 'top' ? 'bottom' : 'top']: 'auto',
        [horizontalKey]: position[horizontalKey] || 0,
        [horizontalKey === 'left' ? 'right' : 'left']: 'auto',
      })
    }
  }, [viewportRect, wrapperRef, targetRef, position, needUpdate])

  return style
}

export default useStyleInView
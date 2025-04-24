import { RefObject, useEffect, useState } from 'react'

/** 특정 요소의 child가 렌더링 되었는지 확인하는 옵저버
 * @param {wrapperRef} wrapperRef  RefObject<HTMLElement> - 옵저버를 적용할 타겟 엘리먼트
 * @param {string} id - 렌더링 되었는지 확인할 child의 data-target-id
 * @returns {boolean} - 렌더링 되었는지 여부
 * @returns {HTMLElement | null} - 렌더링 된 child 엘리먼트
 * */
const useCheckIsChildRenderedObserver = (
  wrapperRef: RefObject<HTMLElement | null>,
  id: string
): { isRendered: boolean; targetElement: HTMLElement | null } => {
  const [isRendered, setIsRendered] = useState(false)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const target = mutation.target as HTMLElement
          const child = target.querySelector(`[data-target-id="${id}"]`)
          if (child) {
            setIsRendered(true)
            setTargetElement(child as HTMLElement)
          }
        }
      }
    })

    observer.observe(wrapperRef.current, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [id, wrapperRef])

  return {
    isRendered,
    targetElement,
  }
}

export default useCheckIsChildRenderedObserver

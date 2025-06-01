import { ComponentType, ReactNode, useEffect, useRef, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'
import useIntersectionObserver, { Elem } from '@/hooks/useIntersectionObserver'

const DEBOUNCE_DELAY = 100

/**
 * NavigationRenderer props
 * @param activeId 현재 활성화된 ID
 * @param ids 모든 ID 배열
 */
type NavigationRenderer = (props: {
  activeId: string | null
  ids: string[]
}) => ReactNode

/**
 * ContentRenderer props
 * @param id 컨텐츠 ID
 */
type ContentRenderer = (props: { id: string }) => ReactNode

const IntersectionObserverOptions = {
  threshold: [0.2],
}

interface ScrollSpyProps {
  /** 컨텐츠에 들어갈 ID 배열 */
  ids: string[]
  /** 네비게이션 컴포넌트 */
  navigationRenderer: NavigationRenderer
  /** 내부 컴포넌트 렌더 컴포넌트 */
  contentRenderer: ContentRenderer
  /** 래퍼 컴포넌트 */
  wrapperComponent: ComponentType<{
    children: ReactNode
  }>
  /** 레이아웃 방향 */
  isHorizontal?: boolean
}

export const ScrollSpy = ({
  ids,
  navigationRenderer,
  contentRenderer,
  wrapperComponent: WrapperComponent,
  isHorizontal = false,
}: ScrollSpyProps) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sectionsRef = useRef<Elem[]>([])

  const { entries } = useIntersectionObserver(
    sectionsRef,
    IntersectionObserverOptions
  )

  const debouncedSetActiveId = useDebounce(
    (newId: string) => setActiveId(newId),
    DEBOUNCE_DELAY
  )

  /**
   * 첫 번째 요소가 화면에 보이면 activeId 업데이트
   */
  useEffect(() => {
    const $target = entries[0]?.target as HTMLElement
    const index = $target?.dataset?.index

    if (typeof index === 'string') {
      debouncedSetActiveId(ids[+Number(index)])
    }
  }, [entries, debouncedSetActiveId, ids])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          zIndex: 1,
        }}
      >
        {navigationRenderer({ activeId, ids })}
      </div>
      <WrapperComponent>
        {new Array(ids.length).fill(0).map((_, index) => {
          return (
            <div
              ref={(ref) => {
                sectionsRef.current[index] = ref
              }}
              data-index={index}
              key={`scroll-spy-item-${ids[index]}`}
              id={ids[index]}
            >
              {contentRenderer({ id: ids[index] })}
            </div>
          )
        })}
      </WrapperComponent>
    </div>
  )
}

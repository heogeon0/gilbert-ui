import {
  ComponentType,
  ForwardedRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

import { ScrollBoxRef } from '../scrollBox'

import useIntersectionObserver, { Elem } from '@/hooks/useIntersectionObserver'

const IntersectionObserverOptions = {
  threshold: [0.2],
}

interface ScrollSpyProps {
  /**
   * IDs of the sections to spy on
   */
  ids: string[]
  /**
   * Offset from the top of the viewport when calculating intersection
   */
  offset?: number
  /**
   * Navigation component that receives the active section ID
   */
  navigation: (props: {
    activeId: string | null
    ids: string[]
    ref: ForwardedRef<ScrollBoxRef>
  }) => ReactNode
  /**
   * Content to be spied on
   */
  renderer: (id: string) => ReactNode
  /**
   * Wrapper component that receives the children
   */
  wrapperComponent: ComponentType<{
    children: ReactNode
  }>
  /**
   * Layout direction for navigation and content
   * @default false
   */
  isHorizontal?: boolean
}

export const ScrollSpy = ({
  ids,
  navigation,
  renderer,
  wrapperComponent: WrapperComponent,
  isHorizontal = false,
}: ScrollSpyProps) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sectionsRef = useRef<Elem[]>([])
  const scrollBoxRef = useRef<ScrollBoxRef>(null)

  const { entries } = useIntersectionObserver(
    sectionsRef,
    IntersectionObserverOptions
  )

  // console.log(entries)
  /**
   * id가 화면의 반 이상 보이면 activeId 업데이트
   */
  useEffect(() => {
    const $target = entries[0]?.target as HTMLElement
    const index = $target?.dataset?.index

    setActiveId(ids[+Number(index)])
  }, [entries])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        gap: '20px',
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
        {navigation({ activeId, ids, ref: scrollBoxRef })}
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
              {renderer(ids[index])}
            </div>
          )
        })}
      </WrapperComponent>
    </div>
  )
}

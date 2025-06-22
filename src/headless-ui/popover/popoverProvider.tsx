import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { createPortal } from 'react-dom'

import useStyleInView from "@/hooks/useStyleInView"

type PopoverRenderer = (onClose: () => void, isOpen: boolean) => ReactNode
type PopoverStateValue = {
  isOpen: boolean
  renderer: PopoverRenderer
  id: string
  targetRef: React.RefObject<HTMLElement>
}

type PopoverState = Map<string, PopoverStateValue>
type PopoverDispatchState = {
  showPopover: (id: string, renderer: PopoverRenderer, targetRef: React.RefObject<HTMLElement>) => void
  hidePopover: (id: string) => void
  hideAllPopovers: () => void
}

interface PopoverProviderProps {
  children: ReactNode
  allowMultiple?: boolean // 여러 개의 팝오버를 동시에 열 수 있는지 여부
}

const menuPosition = {
  top: 10,
  bottom: 10,
  left: 8,
  right: 8,
}


const PopoverContext = createContext<PopoverState>(new Map())
const PopoverDispatchContext = createContext<PopoverDispatchState>({
  showPopover: () => {},
  hidePopover: () => {},
  hideAllPopovers: () => {},
})

const PopoverPortal = ({ 
  renderer, 
  isOpen, 
  targetRef, 
  onClose 
}: {
  renderer: PopoverRenderer
  isOpen: boolean
  targetRef: React.RefObject<HTMLElement>
  onClose: () => void
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const style = useStyleInView(
    wrapperRef,
    targetRef,
    menuPosition,
    'absolute',
    true
  )

  console.log(style)

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'absolute',
        pointerEvents: 'auto',
        ...style,
      }}
    >
        {renderer(onClose, isOpen)}
    </div>
  )
}

export const PopoverProvider = ({ children, allowMultiple = false }: PopoverProviderProps) => {
  const [popoverState, setPopoverState] = useState<PopoverState>(new Map())
  const popoverValues = Array.from(popoverState.values())
  const [popoverRoot, setPopoverRoot] = useState<HTMLElement | null>(null)

  // 팝오버 루트를 동적으로 생성(스토리북 이슈)
  useEffect(() => {
    let root = document.getElementById('popover-root')
    if (!root) {
      root = document.createElement('div')
      root.id = 'popover-root'
      root.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1000;
      `
      document.body.appendChild(root)
    }
    setPopoverRoot(root)

    return () => {
      if (root && root.parentNode) {
        root.parentNode.removeChild(root)
      }
    }
  }, [])

  const showPopover = (id: string, renderer: PopoverRenderer, targetRef: React.RefObject<HTMLElement>) => {
    setPopoverState((prev) => {
      const newState = new Map(prev)
      
      // allowMultiple이 false이면 기존 팝오버들을 모두 닫음
      if (!allowMultiple) {
        newState.clear()
      }
      
      newState.set(id, { isOpen: true, renderer, id, targetRef })
      return newState
    })
  }

  const hidePopover = (id: string) => {
    setPopoverState((prev) => {
      const newState = new Map(prev)
      newState.delete(id)
      return newState
    })
  }

  const hideAllPopovers = () => {
    setPopoverState(new Map())
  }

  return (
    <PopoverContext.Provider value={popoverState}>
      <PopoverDispatchContext.Provider value={{ showPopover, hidePopover, hideAllPopovers }}>
        {children}
        {popoverRoot && createPortal(
          popoverValues.map(({ isOpen, renderer, id, targetRef }) => (
            <PopoverPortal
              key={id}
              renderer={renderer}
              isOpen={isOpen}
              targetRef={targetRef}
              onClose={() => hidePopover(id)}
            />
          )),
          popoverRoot
        )}
      </PopoverDispatchContext.Provider>
    </PopoverContext.Provider>
  )
}

export const usePopover = () => {
  return useContext(PopoverContext)
}

export const useSetPopover = () => {
  const { showPopover, hidePopover, hideAllPopovers } = useContext(PopoverDispatchContext)
  return { showPopover, hidePopover, hideAllPopovers }
} 
import { createContext, ReactNode, useContext, useState } from "react";


type SanckbarRenderer = (onClose: () => void, isDeleteAnimationStarted: boolean) => ReactNode
type SnackbarStateValue = {
  isDeleteAnimationStarted: boolean,
  renderer: SanckbarRenderer,
  id: string,
}

type SnackbarState = Map<string, SnackbarStateValue>
type SnackbarDispatchState = {
  showSnackbar: (id: string, renderer: SanckbarRenderer) => void,
  updateSnackbar: (id: string, isDeleteAnimationStarted: boolean) => void,
  hideSnackbar: (id: string) => void,
}

const SnackbarContext = createContext<SnackbarState>(new Map())
const SnackbarDispatchContext = createContext<SnackbarDispatchState>({
  showSnackbar: () => {},
  updateSnackbar: () => {},
  hideSnackbar: () => {},
})

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>(new Map())
  const snackbarValues = Array.from(snackbarState.values())

  const showSnackbar = (id: string, renderer: SanckbarRenderer) => {
    setSnackbarState((prev) => {
      const newState = new Map(prev)
      newState.set(id, { isDeleteAnimationStarted: false, renderer, id })
      return newState
    })
  }

  const updateSnackbar = (id: string, isDeleteAnimationStarted: boolean) => {
    setSnackbarState((prev) => {
      const newState = new Map(prev)
      const prevState = prev.get(id)
      if (prevState) {
        newState.set(id, { ...prevState, isDeleteAnimationStarted })
      }
      return newState
    })
  }

  const hideSnackbar = (id: string) => {
    setSnackbarState((prev) => {
      const newState = new Map(prev)
      newState.delete(id)
      return newState
    })
  }

  return (
    <SnackbarContext.Provider value={snackbarState}>
      <SnackbarDispatchContext.Provider value={{ showSnackbar, hideSnackbar, updateSnackbar }}>
        {children}
        <div id="snackbarRoot" style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {snackbarValues.map(({ isDeleteAnimationStarted, renderer, id }) => {
            return renderer(() => {
              hideSnackbar(id)
            }, isDeleteAnimationStarted)
          })}
        </div>
      </SnackbarDispatchContext.Provider>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => {
  return useContext(SnackbarContext)
}

export const useSetSnackbar = () => {
  return useContext(SnackbarDispatchContext)
}
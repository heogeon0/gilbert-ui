import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type ModalState = Map<string, ReactNode>
type ModalDispatchState = Dispatch<SetStateAction<ModalState>>

const ModalContext = createContext<ModalState>(new Map())
const ModalDispatchContext = createContext<ModalDispatchState>(() => {})

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>(new Map())
  const modalValues = Array.from(modalState.values())


  return (
    <ModalContext.Provider value={modalState}>
      <ModalDispatchContext.Provider value={setModalState}>
        {children}
        <div id="modalRoot">
          {modalValues.map((children, index) => (
            <div key={index}>{children}</div>
          ))}
        </div>
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext)
}

export const useSetModal = () => {
  const setModalState = useContext(ModalDispatchContext)

  const openModal = (id: string, children: ReactNode) => {
    setModalState((prev) => {
      const newState = new Map(prev)
      newState.set(id, children)
      return newState
    })
  }

  const closeModal = (id: string) => {
    setModalState((prev) => {
      const newState = new Map(prev)
      newState.delete(id)
      return newState
    })
  }

  return { openModal, closeModal }
}
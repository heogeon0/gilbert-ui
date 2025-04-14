import React, { useCallback, useState } from 'react'

type AccordionItemProps = {
  id: string | number
  title: string | React.ReactNode
  description: string | React.ReactNode
}

type ToggleItem = () => void

type Props<T> = {
  items: T[]
  titleRenderer: (
    toggleItem: ToggleItem,
    title: string | React.ReactNode
  ) => React.ReactNode
  descriptionRenderer: (descrtion: string | React.ReactNode) => React.ReactNode
  initialId?: string | number
  wrapperStyle?: React.CSSProperties
}

const Accordion = <T extends AccordionItemProps>({
  titleRenderer,
  descriptionRenderer,
  items,
  wrapperStyle,
}: Props<T>) => {
  const [currentId, setCurrentId] = useState<string | number | null>(null)
  const toggleItem = useCallback(
    (id: string | number) => () => {
      setCurrentId((prev) => (prev === id ? null : id))
    },
    []
  )
  return (
    <ul style={wrapperStyle}>
      {items.map((item) => {
        const { id } = item
        const isCurrent = currentId === id
        return (
          <li key={id}>
            {titleRenderer(toggleItem(id), item.title)}
            {isCurrent && descriptionRenderer(item.description)}
          </li>
        )
      })}
    </ul>
  )
}

export default Accordion

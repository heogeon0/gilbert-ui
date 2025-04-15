import React, { useCallback, useEffect, useRef, useState } from 'react'

type ToggleItem = () => void

type Item = {
  id: string | number
  title: string | React.ReactNode
  description: string | React.ReactNode
}

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

const Accordion = <T extends Item>({
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
    [currentId]
  )

  return (
    <ul style={wrapperStyle}>
      {items.map((item) => {
        const { id } = item
        const isCurrent = currentId === id
        return (
          <AccordionItem
            key={id}
            isCurrent={isCurrent}
            title={item.title}
            description={item.description}
            toggleItem={toggleItem(id)}
            titleRenderer={titleRenderer}
            descriptionRenderer={descriptionRenderer}
          />
        )
      })}
    </ul>
  )
}

export default Accordion

type AccordionItemProps = {
  title: string | React.ReactNode
  description: string | React.ReactNode
  isCurrent: boolean
  toggleItem: ToggleItem
  titleRenderer: (
    toggleItem: ToggleItem,
    title: string | React.ReactNode
  ) => React.ReactNode
  descriptionRenderer: (descrtion: string | React.ReactNode) => React.ReactNode
}

const AccordionItem = ({
  title,
  isCurrent,
  description,
  toggleItem,
  titleRenderer,
  descriptionRenderer,
}: AccordionItemProps) => {
  const descRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (descRef.current) {
      descRef.current.addEventListener('beforematch', toggleItem)
    }
    return () => {
      if (descRef.current)
        descRef.current.removeEventListener('beforematch', toggleItem)
    }
  }, [toggleItem])

  return (
    <li>
      {titleRenderer(toggleItem, title)}
      {/* @ts-expect-error - react-html-attributes에 HIDDEN이 존재하지않음*/}
      <div ref={descRef} HIDDEN={isCurrent ? undefined : 'until-found'}>
        {descriptionRenderer(description)}
      </div>
    </li>
  )
}

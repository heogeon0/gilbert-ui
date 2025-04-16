import React, { useState } from 'react'
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

const TabMenu = ({
  items,
  initialId,
  titleRenderer,
  wrapperStyle,
}: Props<Item>) => {
  const [currentId, setCurrentId] = useState<(typeof items)[number]['id']>(
    initialId || items[0].id
  )

  const toggleItem = (id: string | number) => () => {
    setCurrentId(id)
  }
  const selectedDescription = items.find(
    (item) => item.id === currentId
  )?.description

  return (
    <div className="container" style={wrapperStyle}>
      <ul className="tabList">
        {items.map((d) => titleRenderer(toggleItem(d.id), d.title))}
      </ul>
      <div className="description">{selectedDescription}</div>
    </div>
  )
}

export default TabMenu

import React, { useState } from 'react'
type ToggleItem = () => void

type Item = {
  id: string | number
  title: string | React.ReactNode
  description: string | React.ReactNode
}

type TitleRenderer<T> = ({
  item,
  isSelected,
  toggleItem,
  index,
}: {
  item: T
  index: number
  isSelected: boolean
  toggleItem: ToggleItem
}) => React.ReactNode

type Props<T> = {
  /** 탭메뉴에 들어갈 아이템 조합 기본적으로 id, title, description이 포함되어야함 */
  items: T[]
  /** 타이틀 렌더링 함수, item과, toogleItem과 isSelected를 인자로 넣어줌 */
  titleRenderer: TitleRenderer<T>
  /** 설명 렌더링 함수, description을 반환함 */
  descriptionRenderer: (descrtion: string | React.ReactNode) => React.ReactNode
  /** 탭메뉴를 감싸는 wrapper의 스타일 */
  renderTabListWrapper?: (children: React.ReactNode) => React.ReactNode
  /** 탭메뉴 변경 시 호출되는 함수 */
  onTabChange?: (id: string | number) => void
  /** 초기 선택 값 */
  initialId?: string | number
  /** 커스텀 css 스타일 */
  wrapperStyle?: React.CSSProperties
  /** 외부에서 id변경을 컨트롤하고싶을 때 주입하는 id */
  selectedId?: string | number
}

const TabMenu = ({
  items,
  initialId,
  titleRenderer,
  descriptionRenderer,
  wrapperStyle,
  onTabChange,
  selectedId,
  renderTabListWrapper = (children) => (
    <ul className={'tabList'}>{children}</ul>
  ),
}: Props<Item>) => {
  const isControlled = selectedId !== undefined
  const [internalId, setInternalId] = useState<(typeof items)[number]['id']>(
    initialId || items[0].id
  )
  const currentId = isControlled ? selectedId : internalId

  const toggleItem = (id: string | number) => () => {
    if (currentId === id) return
    if (!isControlled) {
      setInternalId(id)
    }
    onTabChange?.(id)
  }

  const selectedDescription = items.find(
    (item) => item.id === currentId
  )?.description

  const tabList = items.map((item, index) => {
    return (
      <React.Fragment key={item.id}>
        {titleRenderer({
          item,
          isSelected: currentId === currentId,
          toggleItem: toggleItem(item.id),
          index,
        })}
      </React.Fragment>
    )
  })

  return (
    <div className="container" style={wrapperStyle}>
      {renderTabListWrapper(tabList)}
      <div className="description">
        {descriptionRenderer(selectedDescription)}
      </div>
    </div>
  )
}

export default TabMenu

import type { Meta, StoryObj } from '@storybook/react'
import { ReactNode, useRef } from 'react'

import ScrollBox, { ScrollBoxRef } from '../scrollBox'
import IDs from './data'

import { ScrollSpy } from './index'

const meta = {
  title: 'Headless UI/ScrollSpy',
  component: ScrollSpy,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ScrollSpy>

export default meta
type Story = StoryObj<typeof meta>

const Content = ({ id }: { id: string }) => (
  <section
    key={id}
    id={id}
    style={{
      height: '300px',
      padding: '20px',
      border: '1px solid #ccc',
      marginBottom: '20px',
    }}
  >
    <h2>{id}</h2>
    <p>Scroll down to see the ScrollSpy in action!</p>
  </section>
)

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ flex: 1 }}>{children}</div>
)

const ScrollBoxItem = ({
  id,
  isActive,
  onClick,
}: {
  id: string | number
  isActive: boolean
  onClick: () => void
}) => (
  <div
    onClick={onClick}
    style={{
      padding: '8px 16px',
      cursor: 'pointer',
      backgroundColor: isActive ? '#e3e3e3' : 'white',
      borderRadius: '4px',
      whiteSpace: 'nowrap',
      transition: 'background-color 0.2s ease',
    }}
  >
    {id}
  </div>
)

const Navigation = ({
  ids,
  activeId,
}: {
  ids: string[]
  activeId: string | null
}) => {
  const temp = '임시커밋용'
  console.log(temp)
  console.log(temp)
  const scrollBoxRef = useRef<ScrollBoxRef>(null)

  const handleItemClick = (id: string) => {
    const scrollTop = document.scrollingElement!.scrollTop

    const itemY = document.getElementById(id)?.getBoundingClientRect().top
    const top = scrollTop + itemY!

    scrollBoxRef.current?.scrollFocus(ids.indexOf(id), 'smooth')
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <ScrollBox
      ref={scrollBoxRef}
      itemCount={ids.length}
      currentIndex={ids.indexOf(activeId || '')}
      renderer={(index) => (
        <ScrollBoxItem
          id={IDs[index]}
          isActive={IDs[index] === activeId}
          onClick={() => handleItemClick(IDs[index])}
        />
      )}
      customButtonProps={{ useButton: true }}
    />
  )
}

export const Vertical: Story = {
  args: {
    ids: IDs,
    navigationRenderer: Navigation,
    wrapperComponent: Wrapper,
    contentRenderer: ({ id }) => <Content id={id} />,
    isHorizontal: false,
  },
}

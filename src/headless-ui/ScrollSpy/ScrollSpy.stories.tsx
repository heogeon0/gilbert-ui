import type { Meta, StoryObj } from '@storybook/react'
import { ReactNode } from 'react'

import ScrollBox from '../scrollBox'

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
      height: '500px',
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

const IDs = [
  'section1',
  'section2',
  'section3',
  'section4',
  'section5',
  'section6',
  'section7',
  'section8',
  'section9',
  'section10',
  'section11',
  'section12',
  'section13',
  'section14',
  'section15',
  'section16',
  'section17',
  'section18',
  'section19',
  'section20',
  'section21',
  'section22',
  'section23',
  'section24',
  'section25',
  'section26',
  'section27',
  'section28',
  'section29',
  'section30',
]

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

export const Vertical: Story = {
  args: {
    ids: IDs,
    offset: 50,
    navigation: ({ ids, activeId, ref }) => (
      <ScrollBox
        ref={ref}
        itemCount={ids.length}
        renderer={(index) => (
          <ScrollBoxItem
            id={IDs[index]}
            isActive={IDs[index] === activeId}
            onClick={() => {}}
          />
        )}
        customButtonProps={{ useButton: true }}
      />
    ),
    wrapperComponent: Wrapper,
    renderer: (id) => <Content id={id} />,
    isHorizontal: false,
  },
}

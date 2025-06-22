import type { Meta, StoryObj } from '@storybook/react'
import { useRef } from 'react'

import { PopoverProvider, useSetPopover } from '@/headless-ui/popover/popoverProvider'
import { ViewportContextProvider } from '@/hooks/useViewportRect'

// 기본 팝오버 데모 (하나의 팝오버만)
const BasicPopoverDemo = () => {
  const { showPopover } = useSetPopover()
  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleShowPopover = () => {
    if (triggerRef.current) {
      const refObject = { current: triggerRef.current }
      showPopover('basic-popover', (onClose) => (
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: '200px',
            zIndex: 1001,
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>기본 팝오버</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
            이것은 기본 팝오버입니다. 버튼을 클릭하면 나타납니다.
          </p>
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            닫기
          </button>
        </div>
      ), refObject)
    }
  }

  return (
    <div style={{ 
      padding: '40px', 
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>
          기본 팝오버 테스트
        </h2>
        <p style={{ margin: '0 0 30px 0', color: '#666', fontSize: '16px' }}>
          아래 버튼을 클릭하면 팝오버가 나타납니다.
        </p>
        <button
          ref={triggerRef}
          onClick={handleShowPopover}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
          }}
        >
          팝오버 열기
        </button>
      </div>
    </div>
  )
}

// 여러 팝오버 데모 (스크롤 가능)
const MultiplePopoverDemo = () => {
  const { showPopover } = useSetPopover()
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleShowPopover = (index: number) => {
    const triggerRef = triggerRefs.current[index]
    if (triggerRef) {
      const refObject = { current: triggerRef }
      showPopover(`popover-${index}`, (onClose) => (
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: '200px',
            zIndex: 1001,
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>팝오버 {index + 1}</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
            이것은 {index + 1}번째 팝오버입니다. 스크롤해도 위치가 자동으로 조정됩니다.
          </p>
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            닫기
          </button>
        </div>
      ), refObject)
    }
  }

  return (
    <div style={{ 
      padding: '20px', 
      height: '200vh', // 스크롤을 위해 높이를 늘림
      background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
        여러 개의 팝오버 테스트
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
              섹션 {index + 1}
            </h3>
            <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
              이 섹션의 버튼을 클릭하면 팝오버가 나타납니다.
            </p>
            <button
              ref={(el) => {
                triggerRefs.current[index] = el
              }}
              onClick={() => handleShowPopover(index)}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                backgroundColor: `hsl(${(index * 30) % 360}, 70%, 50%)`,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              팝오버 {index + 1} 열기
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '40px', 
        textAlign: 'center', 
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '8px',
      }}>
        <p style={{ margin: '0', color: '#666' }}>
          아래로 스크롤하면서 각 버튼을 클릭해보세요. 팝오버가 화면 경계에 닿으면 자동으로 위치가 조정됩니다.
        </p>
      </div>
    </div>
  )
}

const meta = {
  title: 'Headless-ui/Popover',
  component: BasicPopoverDemo,
  decorators: [
    (Story) => (
      <ViewportContextProvider>
        <PopoverProvider allowMultiple={false}>
          <Story />
        </PopoverProvider>
      </ViewportContextProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BasicPopoverDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ViewportContextProvider>
      <PopoverProvider allowMultiple={false}>
        <BasicPopoverDemo />
      </PopoverProvider>
    </ViewportContextProvider>
  ),
}

export const MultiplePopovers: Story = {
  render: () => (
    <ViewportContextProvider>
      <PopoverProvider allowMultiple={true}>
        <MultiplePopoverDemo />
      </PopoverProvider>
    </ViewportContextProvider>
  ),
} 
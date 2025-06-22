import type { Meta, StoryObj } from '@storybook/react'

import { ModalProvider, useSetModal } from '@/headless-ui/modal/modalProvider'

const ModalDemo = () => {
  const { openModal, closeModal } = useSetModal()

  const handleOpenModal = () => {
    openModal('demo-modal', (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onClick={() => closeModal('demo-modal')}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '400px',
            textAlign: 'center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>모달 제목</h2>
          <p>이것은 modalContext를 사용한 모달입니다.</p>
          <button
            onClick={() => closeModal('demo-modal')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            닫기
          </button>
        </div>
      </div>
    ))
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={handleOpenModal}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        모달 열기
      </button>
    </div>
  )
}

const meta = {
  title: 'Headless-ui/Modal',
  component: ModalDemo,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', height: '40vh' }}>
      <ModalProvider>
        <Story />
      </ModalProvider>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
} 
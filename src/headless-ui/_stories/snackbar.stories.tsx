import type { Meta, StoryObj } from '@storybook/react'
import { useRef } from 'react'

import { SnackbarProvider, useSetSnackbar } from '@/headless-ui/snackbar/snackbarProvider'

const SnackbarItem = ({ 
  onClose, 
  isDeleteAnimationStarted, 
  backgroundColor, 
  message,
  onMouseEnter,
  onMouseLeave
}: {
  onClose: () => void
  isDeleteAnimationStarted: boolean
  backgroundColor: string
  message: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}) => {

  const onAnimationEnd = () => {
    if (isDeleteAnimationStarted) {
      onClose()
    }
  }

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes slideOut {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }
        `}
      </style>
      <div
        onAnimationEnd={onAnimationEnd}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          backgroundColor,
          color: 'white',
          padding: '12px 20px',
          borderRadius: '6px',
          minWidth: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          animation: isDeleteAnimationStarted ? 'slideOut 0.3s ease-out forwards' : 'slideIn 0.3s ease-out forwards',
          transition: 'all 0.3s ease-out',
        }}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '18px',
            marginLeft: '10px',
          }}
        >
          ×
        </button>
      </div>
    </>
  )
}

const SnackbarDemo = () => {
  const { showSnackbar, updateSnackbar } = useSetSnackbar()
  const timeoutRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>({})

  const startTimeout = (id: string, delay: number) => {
    // 기존 timeout이 있다면 제거
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]!)
    }
    
    timeoutRefs.current[id] = setTimeout(() => {
      updateSnackbar(id, true)
    }, delay)
  }

  const clearSnackbarTimeout = (id: string) => {
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]!)
      timeoutRefs.current[id] = null
    }
  }

  const handleShowSuccessSnackbar = () => {
    showSnackbar('success', (onClose, isDeleteAnimationStarted) => (
      <SnackbarItem
        onClose={() => {
          clearSnackbarTimeout('success')
          onClose()
        }}
        isDeleteAnimationStarted={isDeleteAnimationStarted}
        backgroundColor="#28a745"
        message="성공적으로 처리되었습니다!"
        onMouseEnter={() => clearSnackbarTimeout('success')}
        onMouseLeave={() => startTimeout('success', 3000)}
      />
    ))
    
    startTimeout('success', 3000)
  }

  const handleShowErrorSnackbar = () => {
    showSnackbar('error', (onClose, isDeleteAnimationStarted) => (
      <SnackbarItem
        onClose={() => {
          clearSnackbarTimeout('error')
          onClose()
        }}
        isDeleteAnimationStarted={isDeleteAnimationStarted}
        backgroundColor="#dc3545"
        message="오류가 발생했습니다. 다시 시도해주세요."
        onMouseEnter={() => clearSnackbarTimeout('error')}
        onMouseLeave={() => startTimeout('error', 3000)}
      />
    ))
    
    startTimeout('error', 3000)
  }

  const handleShowInfoSnackbar = () => {
    showSnackbar('info', (onClose, isDeleteAnimationStarted) => (
      <SnackbarItem
        onClose={() => {
          clearSnackbarTimeout('info')
          onClose()
        }}
        isDeleteAnimationStarted={isDeleteAnimationStarted}
        backgroundColor="#17a2b8"
        message="새로운 정보가 있습니다."
        onMouseEnter={() => clearSnackbarTimeout('info')}
        onMouseLeave={() => startTimeout('info', 3000)}
      />
    ))
    
    startTimeout('info', 3000)
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={handleShowSuccessSnackbar}
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
          성공 스낵바
        </button>
        <button
          onClick={handleShowErrorSnackbar}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          오류 스낵바
        </button>
        <button
          onClick={handleShowInfoSnackbar}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          정보 스낵바
        </button>
      </div>
    </div>
  )
}

const meta = {
  title: 'Headless-ui/Snackbar',
  component: SnackbarDemo,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', height: '40vh', overflow: 'hidden !important', width: '100%' }}>
        <SnackbarProvider>
          <Story />
        </SnackbarProvider>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SnackbarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
} 
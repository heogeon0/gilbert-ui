import type { Meta, StoryObj } from '@storybook/react'

import SingleOpenContextProvider from '@/context/singleOpenContext.tsx'
import Tooltip from '@/headless-ui/tooltip'

const meta = {
  title: 'Headless-ui/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <SingleOpenContextProvider>
        <div style={{ height: '30vh', paddingTop: '30vh' }}>
          <Story />
        </div>
      </SingleOpenContextProvider>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    id: 'tooltip',
    children: <div>애호</div>,
    tooltip: <div style={{ padding: '20px 10px', width: '400px' }}>메롱</div>,
  },
}

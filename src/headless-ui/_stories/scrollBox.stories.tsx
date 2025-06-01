import type { Meta, StoryObj } from '@storybook/react'

import LazyImage from '../lazyImage'

import ScrollBox from '@/headless-ui/scrollBox'

const meta = {
  title: 'Headless-ui/ScrollBox',
  component: ScrollBox,
  decorators: [
    (Story) => (
      <div style={{ height: '30vh', width: '100%', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof ScrollBox>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    customButtonProps: {
      useButton: true,
    },
    ref: null,
    renderer: (index: number) => (
      <LazyImage
        width={50}
        height={100}
        src={`https://picsum.photos/50/100?random=${index}`}
      />
    ),
    itemCount: 30,
  },
}

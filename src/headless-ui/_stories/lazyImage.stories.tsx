import type { Meta, StoryObj } from '@storybook/react'

import LazyImage from '@/headless-ui/lazyImage'

const meta = {
  title: 'Headless-ui/LazyImage',
  component: LazyImage,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '600px',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
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
} satisfies Meta<typeof LazyImage>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    loadingComponent: (
      <div
        style={{
          width: '100%',
          height: '100%',

          backgroundColor: 'lightblue',
        }}
      ></div>
    ),
    width: 600,
    height: 320,
    src: 'https://loremflickr.com/600/320?lock=18',
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import Accordion from '@/headless-ui/accordion'
import data from '@/headless-ui/accordion/data.ts'

const meta = {
  title: 'Headless-ui/Accordion',
  component: Accordion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    items: data,
    titleRenderer: (toggleItem, title) => (
      <button onClick={toggleItem} type="button">
        {title}
      </button>
    ),
    descriptionRenderer: (description) => <div>{description}</div>,
  },
}

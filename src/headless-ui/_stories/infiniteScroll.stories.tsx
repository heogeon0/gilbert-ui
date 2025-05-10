import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import InfiniteScroll, { Props } from '@/headless-ui/infiniteScroll'
import { data } from '@/headless-ui/infiniteScroll/data.ts'
import { pickRandom, randomize, waitFor } from '@/utils'

const InfiniteScrollBasicComponent: React.FC<
  Omit<Props, 'underFetcher' | 'renderer' | 'total'>
> = ({ loadingComponent }) => {
  const [items, setItems] = useState<Datum[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const handleUnderFetcher = async () => {
    if (isLoading) return
    setIsLoading(true)
    const newItems = await generatePageData()
    setItems((prev) => [...prev, ...newItems])
    setIsLoading(false)
  }

  return (
    <div
      style={{
        height: '600px',
        overflowY: 'auto',
      }}
    >
      <InfiniteScroll
        renderer={(index) => <ListItem index={index} {...items[index]} />}
        total={items.length}
        loadingComponent={loadingComponent}
        underFetcher={handleUnderFetcher}
        isUnderLoading={isLoading}
      />
    </div>
  )
}

type Story = StoryObj<typeof meta>

export type Datum = {
  id: string
  title: string
  description: string
}

const ListItem = ({
  id,
  index,
  title,
  description,
}: Datum & { index: number }) => {
  return (
    <li key={id}>
      <p>
        <strong>
          {index}. {title}
        </strong>
      </p>
      <div>{description}</div>
    </li>
  )
}

const generatePageData = async () => {
  const randomData = pickRandom({ data, length: 20 })
  await waitFor(
    randomize({
      min: 300,
      max: 1500,
      step: 50,
    })
  )
  return randomData
}

const meta = {
  title: 'Headless-ui/InfiniteScroll',
  component: InfiniteScrollBasicComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof InfiniteScrollBasicComponent>

export const Basic: Story = {
  args: {
    loadingComponent: <div>Loading...</div>,
  },
}

export default meta

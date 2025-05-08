import '../src/styles/reset.css'
import React from 'react'

import { ViewportContextProvider } from '../src/hooks/useViewportRect'

const withProviders = (Story) => {
  return (
    <ViewportContextProvider>
      <Story />
    </ViewportContextProvider>
  )
}

const preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

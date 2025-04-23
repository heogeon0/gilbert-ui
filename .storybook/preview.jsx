import '../src/styles/reset.css'
import React from 'react'

import { ViewportContextProvider } from '../src/hooks/useViewportRect'

const WithProviders = (Story) => {
  return (
    <ViewportContextProvider>
      <Story />
    </ViewportContextProvider>
  )
}

const preview = {
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

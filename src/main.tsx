import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { MantineProvider } from '@mantine/core'

import { App } from './App'

if (import.meta.env.MODE === 'production') {
  disableReactDevTools()
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </StrictMode>,
)

// import reportWebVitals from './reportWebVitals'
// reportWebVitals(console.log)

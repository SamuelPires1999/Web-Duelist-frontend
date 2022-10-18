import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RelayEnvironmentProvider } from 'react-relay'

import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { MantineProvider } from '@mantine/core'

import { App } from './App'
import relayEnvironment from './RelayEnvironment'

if (import.meta.env.MODE === 'production') {
  disableReactDevTools()
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </RelayEnvironmentProvider>
  </StrictMode>,
)

// import reportWebVitals from './reportWebVitals'
// reportWebVitals(console.log)

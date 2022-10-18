import { BrowserRouter } from 'react-router-dom'

import { Routes } from './Routes'
import Layout from './components/Layout'

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  )
}

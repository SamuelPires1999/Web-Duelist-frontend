import { BrowserRouter } from 'react-router-dom'

import { Routes } from './Routes'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

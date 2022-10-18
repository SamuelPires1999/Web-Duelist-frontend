import { Route, Routes as Router } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'

export const Routes = () => {
  return (
    <Router>
      <Route path="/*" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Router>
  )
}

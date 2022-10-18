import { Route, Routes as Router } from 'react-router-dom'

import { HomePage } from './pages/HomePage'

export const Routes = () => {
  return (
    <Router>
      <Route path="/*" element={<HomePage />} />
    </Router>
  )
}

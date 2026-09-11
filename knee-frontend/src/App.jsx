import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import AnalyzePage from './pages/AnalyzePage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className='w-full min-h-screen'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/analyze" element={<ProtectedRoute><AnalyzePage /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

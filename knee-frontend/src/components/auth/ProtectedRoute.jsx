import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const user = localStorage.getItem('user')
  return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />
}

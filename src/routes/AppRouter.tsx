import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../shared/components/Layout';
import EventsPage from '../features/events/pages/EventsPage';
import EventDetailPage from '../features/events/pages/EventDetailPage';
import ProfilePage from '../features/users/pages/ProfilePage';
import LoginPage from '../features/auth/pages/LoginPage';
import MyBookingsPage from '../features/bookings/pages/BookingsPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import CheckoutPage from '../features/payments/pages/CheckoutPage';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas con Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<EventsPage />} />
        <Route path="event/:id" element={<EventDetailPage />} />
        
        {/* Rutas protegidas (requieren login) */}
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="bookings" 
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Rutas de autenticación (sin Layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Ruta de checkout (protegida) */}
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } 
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
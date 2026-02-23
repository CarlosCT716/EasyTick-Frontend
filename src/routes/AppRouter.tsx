import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../shared/components/Layout';
import EventsPage from '../features/events/pages/EventsPage';
import EventDetailPage from '../features/events/pages/EventDetailPage';
import ProfilePage from '../features/users/pages/ProfilePage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import CheckoutPage from '../features/payments/pages/CheckoutPage';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';
import CreateEventForm from '@/features/events/pages/EventForm';
import MyEventsPage from '@/features/events/pages/MyEventsPage';
import PaymentSuccessPage from '@/features/payments/pages/PaymentSuccessPage';
import PaymentCancelPage from '@/features/payments/pages/PaymentCancelPage';
import MyTicketsPage from '@/features/bookings/pages/MyTicketsPage';
import FilteredEventsPage from '@/features/events/pages/FilteredEventsPage';
import EventEditPage from '@/features/events/pages/EventEditPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        {/* Rutas Públicas */}
        <Route index element={<EventsPage />} />
        <Route path="event/:id" element={<EventDetailPage />} />
        <Route path="category/:categoryId" element={<FilteredEventsPage />} />
        
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
              <MyTicketsPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="create-event" 
          element={
            <ProtectedRoute>
              <CreateEventForm />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="my-events" 
          element={
            <ProtectedRoute>
              <MyEventsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="edit-event/:id" 
          element={
            <ProtectedRoute>
              <EventEditPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="checkout/:id" 
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="pago-exitoso" 
          element={
            <ProtectedRoute>
              <PaymentSuccessPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="pago-cancelado" 
          element={
            <ProtectedRoute>
              <PaymentCancelPage />
            </ProtectedRoute>
          } 
        />
      </Route> 

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
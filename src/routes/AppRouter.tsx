import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../shared/components/Layout';
import EventsPage from '../features/events/pages/EventsPage';
import EventDetailPage from '../features/events/pages/EventDetailPage';
import ProfilePage from '../features/users/pages/ProfilePage';
import LoginPage from '../features/auth/pages/LoginPage';
import MyBookingsPage from '../features/bookings/pages/BookingsPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import CheckoutPage from '../features/payments/pages/CheckoutPage';

const AppRouter = () => {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
        <Route index element={<EventsPage />} />
        <Route path="event/:id" element={<EventDetailPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="bookings" element={<MyBookingsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

export default AppRouter;
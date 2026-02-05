import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../shared/components/Layout';
import EventsPage from '../features/events/pages/EventsPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<EventsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
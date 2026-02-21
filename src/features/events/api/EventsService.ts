import eventsApi from '@/features/events/api/EventsApi';
import type { EventListResponse, EventResponse, CreateEventRequest, UpdateEventRequest, EventCategory } from '@/features/events/models/Event';

export const getAllEvents = async (): Promise<EventListResponse[]> => {
  const response = await eventsApi.get('');
  return response.data;
};

// 🌟 NUEVO: Solo eventos activos
export const getActiveEvents = async (): Promise<EventListResponse[]> => {
  const response = await eventsApi.get('/active');
  return response.data;
};

// 🌟 NUEVO: Obtener categorías
export const getAllCategories = async (): Promise<EventCategory[]> => {
  const response = await eventsApi.get('/categories');
  return response.data;
};

export const getEventById = async (id: string | number): Promise<EventResponse> => {
  const response = await eventsApi.get(`/${id}`);
  return response.data;
};

export const createEvent = async (event: CreateEventRequest, image?: File): Promise<EventResponse> => {
  const formData = new FormData();
  formData.append('event', JSON.stringify(event));
  if (image) formData.append('image', image);

  const response = await eventsApi.post('', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateEvent = async (id: string | number, event: UpdateEventRequest): Promise<EventResponse> => {
  const response = await eventsApi.patch(`/${id}`, event);
  return response.data;
};

export const reduceEventSlots = async (id: string | number, quantity: number): Promise<string> => {
  const response = await eventsApi.post(`/${id}/reduce-slots`, null, { params: { quantity } });
  return response.data;
};

export const deleteEvent = async (id: string | number): Promise<string> => {
  const response = await eventsApi.delete(`/${id}`);
  return response.data;
};
export const getEventsByOrganizer = async (organizerId: number): Promise<EventListResponse[]> => {
  const response = await eventsApi.get(`/organizer/${organizerId}`);
  return response.data;
};

export const changeEventStatus = async (id: number | string, status: string): Promise<EventResponse> => {
  const response = await eventsApi.patch(`/${id}/status`, null, {
    params: { status }
  });
  return response.data;
};
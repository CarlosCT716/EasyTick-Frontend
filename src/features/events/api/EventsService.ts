import eventsApi from '@/features/events/api/EventsApi';
import type { EventListResponse, EventResponse, CreateEventRequest, UpdateEventRequest } from '@/features/events/models/Event';


/**
 * Traer todos los eventos
 */
export const getAllEvents = async (): Promise<EventListResponse[]> => {
  const response = await eventsApi.get('');
  return response.data;
};

/**
 * Traer detalle de un evento por id
 */
export const getEventById = async (id: string | number): Promise<EventResponse> => {
  const response = await eventsApi.get(`/${id}`);
  return response.data;
};

/**
 * Crear un nuevo evento con posibilidad de subir imagen
 */
export const createEvent = async (
  event: CreateEventRequest,
  image?: File
): Promise<EventResponse> => {
  const formData = new FormData();
  formData.append('event', JSON.stringify(event));
  if (image) formData.append('image', image);

  const response = await eventsApi.post('', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Actualizar un evento existente
 */
export const updateEvent = async (
  id: string | number,
  event: UpdateEventRequest
): Promise<EventResponse> => {
  const response = await eventsApi.patch(`/${id}`, event);
  return response.data;
};

/**
 * Reducir cupos disponibles de un evento
 */
export const reduceEventSlots = async (id: string | number, quantity: number): Promise<string> => {
  const response = await eventsApi.post(`/${id}/reduce-slots`, null, {
    params: { quantity },
  });
  return response.data;
};

/**
 * Eliminar un evento
 */
export const deleteEvent = async (id: string | number): Promise<string> => {
  const response = await eventsApi.delete(`/${id}`);
  return response.data;
};
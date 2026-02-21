export interface CreateEventRequest {
  title: string;
  description: string;
  eventDate: string; // ISO string
  location: string;
  price: number;
  capacity: number;
  categoryId: number; 
  organizerId: number;
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  eventDate?: string; // ISO string
  location?: string;
  price?: number;
  capacity?: number;
  categoryId: number; 
  organizerId: number;
}

export interface EventListResponse {
  category: string;
  id: number;
  title: string;
  eventDate: string; // ISO string
  location: string;
  price: number;
  availableSlots: number;
  eventStatus: string; // puedes usar enum si quieres
  imageUrl?: string;
}

export interface EventResponse extends EventListResponse {
  description: string;
  capacity: number;
  organizerId: number;
  createdAt: string; // ISO string
  
}
export interface EventCategory {
  id: number;
  name: string;
}
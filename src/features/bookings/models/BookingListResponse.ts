export interface BookingListResponse {
  id: number;
  eventId: number;
  quantity: number;
  totalPrice: number;
  bookingStatus: string; // 'PENDING', 'CONFIRMED', 'CANCELLED'
  createdAt: string;
}
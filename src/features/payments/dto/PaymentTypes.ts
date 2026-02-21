export interface PaypalLink {
  href: string;
  rel: string;
  method: string;
}

export interface PaypalResponse {
  id: string;
  status: string;
  links: PaypalLink[];
}

export interface PaymentRecord {
  id: number;
  bookingId: number;
  amount: number;
  paymentStatus: string;
  transactionRef: string | null;
}
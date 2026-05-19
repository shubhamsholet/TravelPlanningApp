import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Booking {
  _id: string;      // MongoDB uses _id
  // id?: string;  
  destinationId: string;
  destinationName: string;
  userId: string;
  userEmail: string;
  userName: string;
  travelDate: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  bookingDate: string;
}

export interface CreateBookingData {
  destinationId: string;
  destinationName: string;
  userEmail: string;
  userName: string;
  travelDate: string;
  guests: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBooking(bookingData: CreateBookingData): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, bookingData);
  }

  getUserBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/bookings/${id}`);
  }

  cancelBooking(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/bookings/${id}/cancel`, {});
  }
}
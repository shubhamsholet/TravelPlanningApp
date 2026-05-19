import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Destination {
  _id: string;
  name: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  description: string;
  activities: string[];
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/destinations`);
  }

  getDestinationById(id: string): Observable<Destination> {
    return this.http.get<Destination>(`${this.apiUrl}/destinations/${id}`);
  }

  searchDestinations(query: string): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/destinations/search?q=${query}`);
  }
}
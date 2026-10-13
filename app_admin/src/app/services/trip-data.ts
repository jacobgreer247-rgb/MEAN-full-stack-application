import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  // Get all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  // Add a new trip
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  // Get one trip by its code
  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(
      `${this.apiUrl}/${encodeURIComponent(code)}`
    );
  }

  // Update an existing trip
  updateTrip(code: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiUrl}/${encodeURIComponent(code)}`,
      trip
    );
  }
}
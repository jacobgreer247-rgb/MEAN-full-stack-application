
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css'
})
export class TripList implements OnInit {

  @Output() editTrip = new EventEmitter<string>();

  trips: Trip[] = [];

  constructor(
    private tripData: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripData.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        console.log('Trips loaded successfully:', data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading trips:', err);
      }
    });
  }

  onEdit(code: string): void {
    this.editTrip.emit(code);
  }
}

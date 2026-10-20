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
  errorMessage = '';
  deletingCode: string | null = null;

  constructor(
    private tripData: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripData.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Unable to load trips.';
        this.cdr.detectChanges();
      }
    });
  }

  onEdit(code: string): void {
    this.editTrip.emit(code);
  }

  onDelete(trip: Trip): void {
    if (this.deletingCode !== null) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${trip.name}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.deletingCode = trip.code;

    this.tripData.deleteTrip(trip.code).subscribe({
      next: () => {
        this.trips = this.trips.filter(
          item => item.code !== trip.code
        );

        this.deletingCode = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage =
          'Unable to delete the trip. Check that you are logged in.';

        this.deletingCode = null;
        this.cdr.detectChanges();
      }
    });
  }
}
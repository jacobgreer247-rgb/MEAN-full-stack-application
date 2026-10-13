import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnChanges {

  @Input() tripCode: string = '';

  trip: Trip | null = null;
  message: string = '';

  constructor(
    private tripData: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tripCode'] && this.tripCode) {
      this.loadTrip();
    }
  }

  loadTrip(): void {
    this.message = '';

    this.tripData.getTrip(this.tripCode).subscribe({
      next: (data) => {
        this.trip = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = 'Error loading trip.';
        console.error('Error loading trip:', err);
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (!this.trip) {
      return;
    }

    this.tripData.updateTrip(this.tripCode, this.trip).subscribe({
      next: (updatedTrip) => {
        this.trip = updatedTrip;
        this.message = 'Trip updated successfully!';
        console.log('Trip updated:', updatedTrip);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = 'Error updating trip.';
        console.error('Error updating trip:', err);
        this.cdr.detectChanges();
      }
    });
  }
}
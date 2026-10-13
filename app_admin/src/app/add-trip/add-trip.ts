import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {

  newTrip: Trip = {
    _id: '',
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  message = '';

  constructor(private tripData: TripData) {}

  onSubmit(): void {
    this.tripData.addTrip(this.newTrip).subscribe({
      next: () => {
        this.message = 'Trip added successfully!';
        console.log('Trip added successfully');
      },
      error: (err) => {
        this.message = 'Error adding trip.';
        console.error('Error adding trip:', err);
      }
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripList } from './trip-list/trip-list';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TripList, AddTrip, EditTrip],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'travlr-admin';

  selectedTripCode: string = '';

  onEditTrip(code: string): void {
    this.selectedTripCode = code;
  }
}

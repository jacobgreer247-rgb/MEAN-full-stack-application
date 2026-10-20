import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripList } from './trip-list/trip-list';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TripList, AddTrip, EditTrip],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'travlr-admin';
  selectedTripCode = '';

  email = '';
  password = '';
  loginError = '';
  loggingIn = false;

  constructor(public auth: AuthService) {}

  login(): void {
    this.loginError = '';

    if (!this.email.trim() || !this.password) {
      this.loginError = 'Enter your email and password.';
      return;
    }

    this.loggingIn = true;

    this.auth.login(this.email.trim(), this.password).subscribe({
      next: () => {
        this.password = '';
        this.loggingIn = false;
      },
      error: (err) => {
        this.loginError =
          err.status === 401
            ? 'Incorrect email or password.'
            : 'Unable to log in. Check that the server is running.';

        this.loggingIn = false;
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.selectedTripCode = '';
    this.password = '';
    this.loginError = '';
  }

  onEditTrip(code: string): void {
    if (this.auth.isLoggedIn()) {
      this.selectedTripCode = code;
    }
  }
}
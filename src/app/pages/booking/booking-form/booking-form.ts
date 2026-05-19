import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { DestinationService, Destination } from '../../../services/destination.service';
import { BookingService, CreateBookingData } from '../../../services/booking.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './booking-form.html',
  styleUrls: ['./booking-form.css'],
})
export class BookingFormComponent implements OnInit {
  destination = signal<Destination | null>(null);
  loading = signal(true);
  submitting = signal(false);

  bookingData = {
    userName: '',
    email: '',
    travelDate: '',
    guests: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destinationService: DestinationService,
    private bookingService: BookingService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.bookingData.userName = currentUser.name || '';
      this.bookingData.email = currentUser.email || '';
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.destinationService.getDestinationById(id).subscribe({
        next: (data) => {
          if (data) {
            this.destination.set(data);
          } else {
            this.toastr.error('Destination not found');
            this.router.navigate(['/destinations']);
          }
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.toastr.error('Error loading destination');
        },
      });
    }
  }

  get totalPrice(): number {
    const dest = this.destination();
    if (!dest) return 0;
    return dest.price * this.bookingData.guests;
  }

 onSubmit(): void {
  if (!this.validateForm()) {
    return;
  }

  this.submitting.set(true);
  
  const booking: CreateBookingData = {
    destinationId: this.destination()!._id,  // This is now MongoDB _id
    destinationName: this.destination()!.name,
    userEmail: this.bookingData.email,
    userName: this.bookingData.userName,
    travelDate: this.bookingData.travelDate,
    guests: this.bookingData.guests,
    totalPrice: this.totalPrice
  };

  this.bookingService.createBooking(booking).subscribe({
    next: (newBooking) => {
      this.toastr.success('Booking confirmed successfully!');
      this.router.navigate(['/booking-confirmation', newBooking._id]);
    },
    error: (error) => {
      this.submitting.set(false);
      this.toastr.error(error.error?.message || 'Booking failed. Please try again.');
    }
  });
}

  validateForm(): boolean {
    if (!this.bookingData.userName.trim()) {
      this.toastr.error('Please enter your name');
      return false;
    }
    if (!this.bookingData.email.trim() || !this.bookingData.email.includes('@')) {
      this.toastr.error('Please enter valid email');
      return false;
    }
    if (!this.bookingData.travelDate) {
      this.toastr.error('Please select travel date');
      return false;
    }
    if (this.bookingData.guests < 1) {
      this.toastr.error('Minimum 1 guest required');
      return false;
    }
    return true;
  }
}

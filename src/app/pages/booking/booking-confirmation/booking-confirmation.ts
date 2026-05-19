import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookingService, Booking } from '../../../services/booking.service';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './booking-confirmation.html',
  styleUrls: ['./booking-confirmation.css'],
})
export class BookingConfirmationComponent implements OnInit {
  booking = signal<Booking | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.bookingService.getBookingById(bookingId).subscribe({
        next: (data) => {
          if (data) {
            this.booking.set(data);
          } else {
            this.toastr.error('Booking not found');
            this.router.navigate(['/destinations']);
          }
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.toastr.error('Error loading booking details');
        },
      });
    } else {
      this.loading.set(false);
      this.router.navigate(['/destinations']);
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

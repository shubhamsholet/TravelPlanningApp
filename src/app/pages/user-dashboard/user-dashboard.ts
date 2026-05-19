import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboardComponent implements OnInit {
  currentUser = signal<any>(null);
  recentBookings = signal<Booking[]>([]);
  loading = signal(true);
  stats = {
    totalBookings: 0,
    totalSpent: 0,
    upcomingTrips: 0
  };

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.currentUser.set(this.authService.getCurrentUser());
    this.loadUserData();
  }

  loadUserData(): void {
  this.loading.set(true);
  const user = this.currentUser();
  
  if (user) {
    this.bookingService.getUserBookings().subscribe({
      next: (bookings) => {
        this.recentBookings.set(bookings.slice(0, 3));
        
        // Calculate stats
        const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
        this.stats.totalBookings = confirmedBookings.length;
        this.stats.totalSpent = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
        
        // Count upcoming trips (future dates)
        const today = new Date();
        this.stats.upcomingTrips = confirmedBookings.filter(b => 
          new Date(b.travelDate) > today
        ).length;
        
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  } else {
    this.loading.set(false);
  }
}

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
}
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Destination, DestinationService } from '../../services/destination.service';
import { TravelChatbotComponent } from '../../components/travel-chatbot/travel-chatbot';

@Component({
  selector: 'app-destination-list',
  standalone: true,
  imports: [
    CommonModule,
    TravelChatbotComponent,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule  
  ],
  templateUrl: './destination-list.html',
  styleUrls: ['./destination-list.css']
})
export class DestinationListComponent implements OnInit {

  destinations = signal<Destination[]>([]);
  filteredDestinations = signal<Destination[]>([]);
  searchQuery = signal<string>('');
  loading = signal<boolean>(true);

  constructor(private destinationService: DestinationService) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {
    this.loading.set(true);
    this.destinationService.getAllDestinations().subscribe({
      next: (data) => {
        this.destinations.set(data);
        this.filteredDestinations.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onSearch(): void {
    const query = this.searchQuery().trim();
    if (!query) {
      this.filteredDestinations.set(this.destinations());
      return;
    }

   this.destinationService.searchDestinations(query).subscribe({
      next: (data) => this.filteredDestinations.set(data)
    });
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.filteredDestinations.set(this.destinations());
  }
}
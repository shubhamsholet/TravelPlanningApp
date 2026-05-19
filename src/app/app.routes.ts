import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },
    {
      path: 'register',
      loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent)
    },
  {
    path: 'destinations',
    loadComponent: () =>
      import('./pages/destination-list/destination-list').then((m) => m.DestinationListComponent),
  },
  //   {
  //     path: 'destination/:id',
  //     loadComponent: () => import('./pages/destination-detail/destination-detail.component').then(m => m.DestinationDetailComponent)
  //   },
  {
    path: 'booking/:id',
    loadComponent: () =>
      import('./pages/booking/booking-form/booking-form').then((m) => m.BookingFormComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'booking-confirmation/:id',
    loadComponent: () =>
      import('./pages/booking/booking-confirmation/booking-confirmation').then(
        (m) => m.BookingConfirmationComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'my-bookings',
    loadComponent: () =>
      import('./pages/booking/my-bookings/my-bookings').then((m) => m.MyBookingsComponent),
    canActivate: [AuthGuard],
  },
  //   {
  //     path: 'itinerary/:id',
  //     loadComponent: () => import('./pages/itinerary-view/itinerary-view.component').then(m => m.ItineraryViewComponent),
  //     canActivate: [AuthGuard]
  //   },
  //   {
  //     path: 'saved-itineraries',
  //     loadComponent: () => import('./pages/saved-itineraries/saved-itineraries.component').then(m => m.SavedItinerariesComponent),
  //     canActivate: [AuthGuard]
  //   },
    {
      path: 'dashboard',
      loadComponent: () => import('./pages/user-dashboard/user-dashboard').then(m => m.UserDashboardComponent),
      canActivate: [AuthGuard]
    },
    {
      path: 'profile',
      loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent),
      canActivate: [AuthGuard]
    },
  { path: '**', redirectTo: '/destinations' },
];

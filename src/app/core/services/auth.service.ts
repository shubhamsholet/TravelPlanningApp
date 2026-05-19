// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { User, LoginCredentials, RegisterData } from '../models/user.model';
// import { environment } from '../../../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = environment.apiUrl;
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   currentUser$ = this.currentUserSubject.asObservable();

//   constructor(private http: HttpClient) {
//     const storedUser = localStorage.getItem('currentUser');
//     if (storedUser) {
//       this.currentUserSubject.next(JSON.parse(storedUser));
//     }
//   }

//   login(credentials: LoginCredentials): Observable<any> {
//     const mockUser = {
//       id: '1',
//       name: credentials.email.split('@')[0],
//       email: credentials.email,
//       role: 'user'
//     };

//     if (environment.mockData) {
//       // Mock login for dummy project
//       const mockUser = { id: '1', name: 'Test User', email: credentials.email, role: 'user' };
//       localStorage.setItem('currentUser', JSON.stringify(mockUser));
//       localStorage.setItem('token', 'mock-jwt-token');
//       this.currentUserSubject.next(mockUser);
//       return new Observable((observer) => observer.next({ user: mockUser }));
//     }

//     return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
//       tap((response: any) => {
//         localStorage.setItem('currentUser', JSON.stringify(response.user));
//         localStorage.setItem('token', response.token);
//         this.currentUserSubject.next(response.user);
//       }),
//     );
//   }

//   register(data: RegisterData): Observable<any> {
//     if (environment.mockData) {
//       const mockUser = { id: '2', name: data.name, email: data.email, role: 'user' };
//       return new Observable((observer) => observer.next({ user: mockUser }));
//     }
//     return this.http.post(`${this.apiUrl}/auth/register`, data);
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('token');
//     this.currentUserSubject.next(null);
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }
// }
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSignal = signal<User | null>(null);
  currentUser$ = toObservable(this.currentUserSignal);

  constructor(private http: HttpClient) {
    this.loadStoredUser();
    console.log('apiUrl:', this.apiUrl);
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('currentUser');
    if (token && userStr) {
      const user = JSON.parse(userStr);
      this.currentUserSignal.set(user);
    }
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSignal.set(response);
      }),
    );
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSignal.set(response);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }
}

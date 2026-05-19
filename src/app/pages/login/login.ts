import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, 
    FormsModule, 
    RouterLink,
    MatInputModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
 email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.toastr.error('Please fill all fields');
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.toastr.success('Login successful!');
        this.router.navigate(['/destinations']);
      },
      error: () => {
        this.toastr.error('Invalid credentials (use any email/password for demo)');
      }
    });
  }
}
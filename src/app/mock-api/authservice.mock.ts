import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockAuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Simulate an initial logged-in user for testing
    const mockUser = this.getCurrentUser();
    if (mockUser?.username) {
      this.currentUserSubject.next(mockUser);
    }
  }

  login(username: string, password: string) {
    // Simulate API response based on credentials
    const validCredentials = username === 'admin' && password === '1234';
    const mockResponse = validCredentials
      ? { success: true, data: { token: 'mock-token-123', username, role: 'admin' } }
      : { success: false, message: 'Invalid credentials' };

    return of(mockResponse).pipe(
      map(response => {
        if (response.success && response.data?.token) {
          return response.data;
        }
        throw new Error(response.message || 'Invalid response from server');
      }),
      tap(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        this.currentUserSubject.next(data);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        let errorMessage = 'Login failed. Please try again.';
        if (error.message === 'Invalid credentials') {
          errorMessage = 'Invalid credentials';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser() {
    return {
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role')
    };
  }
}
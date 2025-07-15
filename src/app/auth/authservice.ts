import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(private router: Router, private http: HttpClient) {
    const user = this.getCurrentUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  login(username: string, password: string) {
  return this.http.post<any>(`${environment.apiUrl}/Auth/login`, { username, password })
    .pipe(
      map(response => {
        if (response.isSuccess && response.result?.token) {
          return response.result;
        }
        throw new Error(response.message || 'Invalid response from server');
      }),
      tap(result => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username);
        localStorage.setItem('role', result.role);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        
        let errorMessage = 'Login failed. Please try again.';
        
        if (error.status === 0) {
          errorMessage = 'Unable to connect to server. Please check your network.';
        } else if (error.error?.success === false && error.error.message === 'Invalid credentials') {
          errorMessage = 'Invalid credentials';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
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
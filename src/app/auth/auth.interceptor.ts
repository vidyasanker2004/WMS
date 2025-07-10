// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service'; 
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService); 
  const token = localStorage.getItem('token');
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        // Unauthorized - session expired
        localStorage.removeItem('token');
        notificationService.showError('Your session has expired. Please log in again.');
        router.navigate(['/login'], {
          queryParams: { returnUrl: router.routerState.snapshot.url }
        });
      } else if (err.status === 403) {
        // Forbidden - insufficient permissions
        notificationService.showError('You do not have permission to access this resource.');
      } else if (err.status >= 500) {
        // Server error
        notificationService.showError('A server error occurred. Please try again later.');
      }
      
      return throwError(() => err);
    })
  );
};

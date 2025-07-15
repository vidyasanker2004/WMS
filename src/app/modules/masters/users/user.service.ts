import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`; 

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  getCompanies(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createUser(UserData: FormData | User): Observable<User> {
    return this.http.post<User>(this.apiUrl, UserData, {
      headers: {
        // FormData will set its own content-type with boundary
      }
    }).pipe(catchError(this.handleError));
  }

  updateUser(id: string, updates: Partial<User> | FormData): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, updates)
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
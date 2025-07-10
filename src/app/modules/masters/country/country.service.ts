import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiResponse, Country } from './country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = `${environment.apiUrl}/Country`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getCountries(): Observable<ApiResponse<Country>> {
  return this.http.get<ApiResponse<Country>>(this.apiUrl)
    .pipe(catchError(this.handleError));
  }

 
  getCountry(id: number): Observable<Country> {
    
    return this.http.get<Country>(`${this.apiUrl}/${id}`);
  }

  createCountry(country: Country): Observable<Country> {
   
    return this.http.post<any>(this.apiUrl, country);
  }

  updateCountry(updatedCountry: Country): Observable<Country> {
    
    return this.http.put<any>(`${this.apiUrl}`, updatedCountry);
  }

  deleteCountry(id: number): Observable<any> {
    
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
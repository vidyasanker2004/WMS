import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Company } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/companies`; 

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createCompany(companyData: FormData | Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, companyData, {
      headers: {
        // FormData will set its own content-type with boundary
      }
    }).pipe(catchError(this.handleError));
  }

  updateCompany(id: string, updates: Partial<Company>): Observable<Company> {
    return this.http.patch<Company>(`${this.apiUrl}/${id}`, updates)
      .pipe(catchError(this.handleError));
  }

  deleteCompany(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
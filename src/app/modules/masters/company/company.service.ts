import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Company } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/companies`; // More RESTful endpoint
  private lastId = 2;
  
  private companies: Company[] = [
    { 
      id: '1', 
      companyName: 'Tech Solutions Inc', 
      companyCode: 'TSI',
      thirdPartyLogistics: false,
      address1: '123 Tech Park',
      address: '123 Tech Park, Sector 5',
      city: 'Bangalore', 
      state: 'Karnataka', 
      pin: '560001', 
      country: 'India',
      phone: '9876543210',
      phonePrefix: '+91',
      email: 'contact@techsolutions.com',
      website: 'www.techsolutions.com',
      contactEmail: 'partner@techsolutions.com',
      contactPartner: 'John Doe',
      mobileNo: '9876543210',
      mobilePrefix: '+91',
      baseCurrency: 'INR',
      vatTinNo: 'VAT12345',
      cstNo: 'CST54321',
      eccNo: 'ECC98765',
      tinDate: '2020-01-01',
      cstDate: '2020-01-01'
    },
    { 
      id: '2', 
      companyName: 'Global Innovations', 
      companyCode: 'GLI',
      thirdPartyLogistics: true,
      address1: '456 Innovation Blvd',
      address: '456 Innovation Blvd, Suite 100',
      city: 'San Francisco', 
      state: 'California', 
      pin: '94105', 
      country: 'USA',
      phone: '4155551234',
      phonePrefix: '+1',
      email: 'info@globalinnov.com',
      website: 'www.globalinnov.com',
      contactEmail: 'partner@globalinnov.com',
      contactPartner: 'Jane Smith',
      mobileNo: '4155555678',
      mobilePrefix: '+1',
      baseCurrency: 'USD',
      vatTinNo: 'USVAT123',
      cstNo: 'USCST456',
      eccNo: 'USECC789',
      tinDate: '2020-02-01',
      cstDate: '2020-02-01'
    }
  ];

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  private simulateDelay<T>(data: T): Observable<T> {
    return of(data).pipe(delay(500));
  }

  getCompanies(): Observable<Company[]> {
    if (environment.production) {
      return this.http.get<Company[]>(this.apiUrl)
        .pipe(catchError(this.handleError));
    }
    return this.simulateDelay([...this.companies]);
  }

  getCompany(id: string): Observable<Company> {
    if (environment.production) {
      return this.http.get<Company>(`${this.apiUrl}/${id}`)
        .pipe(catchError(this.handleError));
    }
    
    const company = this.companies.find(c => c.id === id);
    return company 
      ? this.simulateDelay({...company})
      : throwError(() => new Error(`Company not found`));
  }

  createCompany(companyData: FormData | Company): Observable<Company> {
    if (environment.production) {
      return this.http.post<Company>(this.apiUrl, companyData, {
        headers: {
          // FormData will set its own content-type with boundary
        }
      }).pipe(catchError(this.handleError));
    }

    const newId = (this.companies.length + 1).toString();
    const newCompany = { 
      ...(companyData as Company), 
      id: newId 
    };
    this.companies.push(newCompany);
    return this.simulateDelay(newCompany);
  }

  updateCompany(id: string, updates: Partial<Company>): Observable<Company> {
    if (environment.production) {
      return this.http.patch<Company>(`${this.apiUrl}/${id}`, updates)
        .pipe(catchError(this.handleError));
    }

    const index = this.companies.findIndex(c => c.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Company not found`));
    }

    const updatedCompany = { 
      ...this.companies[index], 
      ...updates 
    };
    this.companies[index] = updatedCompany;
    return this.simulateDelay(updatedCompany);
  }

  deleteCompany(id: string): Observable<void> {
    if (environment.production) {
      return this.http.delete<void>(`${this.apiUrl}/${id}`)
        .pipe(catchError(this.handleError));
    }

    const index = this.companies.findIndex(c => c.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Company not found`));
    }

    this.companies.splice(index, 1);
    return this.simulateDelay(undefined);
  }
}
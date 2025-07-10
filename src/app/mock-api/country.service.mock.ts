import { of, throwError, delay, Observable } from 'rxjs';
import { Countrymock } from '../modules/masters/country/country.model';
import { Injectable } from '@angular/core';

interface ApiResponse<T> {
  success: boolean;
  result?: T;
  message?: string;
}

@Injectable({ providedIn: 'root' }) 
export class CountryServiceMock {
  private mockCountries: Countrymock[] = [
    { id: 1, countryName: 'United States', countryCode: 'US' },
    { id: 2, countryName: 'Canada', countryCode: 'CA' },
    { id: 3, countryName: 'Mexico', countryCode: 'MX' }
  ];

  private simulateDelay = 200;
  private shouldError = false;

  // Enhanced with proper typing and error response structure
  getCountries(): Observable<ApiResponse<Countrymock[]>> {
    if (this.shouldError) {
      return throwError(() => ({
        error: {
          message: 'Simulated API error - Connection timed out',
          status: 500
        }
      })).pipe(delay(this.simulateDelay));
    }
    return of({
      success: true,
      result: [...this.mockCountries]
    }).pipe(delay(this.simulateDelay));
  }

  getCountry(id: number): Observable<Countrymock> {
  const country = this.mockCountries.find(c => c.id === id);
  if (!country) {
    return throwError(() => 'Country not found');
  }
  return of(country).pipe(delay(this.simulateDelay));
  }

  createCountry(country: Omit<Countrymock, 'id'>): Observable<Countrymock> {
    if (this.shouldError) {
      return throwError(() => ({
        error: {
          message: 'Simulated create error - Validation failed',
          status: 400
        }
      })).pipe(delay(this.simulateDelay));
    }
    const newId = Math.max(...this.mockCountries.map(c => c.id), 0) + 1;
    const newCountry: Countrymock = { ...country, id: newId };
    this.mockCountries.push(newCountry);
    return of(newCountry).pipe(delay(this.simulateDelay));
  }

  updateCountry(updatedCountry: Countrymock): Observable<Countrymock> {
    if (this.shouldError) {
      return throwError(() => ({
        error: {
          message: 'Simulated update error - Country not found',
          status: 404
        }
      })).pipe(delay(this.simulateDelay));
    }
    const index = this.mockCountries.findIndex(c => c.id === updatedCountry.id);
    if (index === -1) {
      return throwError(() => ({
        error: {
          message: 'Country not found',
          status: 404
        }
      })).pipe(delay(this.simulateDelay));
    }
    this.mockCountries[index] = updatedCountry;
    return of(updatedCountry).pipe(delay(this.simulateDelay));
  }

  deleteCountry(id: number): Observable<{ success: boolean }> {
    if (this.shouldError) {
      return throwError(() => ({
        error: {
          message: 'Simulated delete error - Internal server error',
          status: 500
        }
      })).pipe(delay(this.simulateDelay));
    }
    const initialLength = this.mockCountries.length;
    this.mockCountries = this.mockCountries.filter(c => c.id !== id);
    
    if (this.mockCountries.length === initialLength) {
      return throwError(() => ({
        error: {
          message: 'Country not found',
          status: 404
        }
      })).pipe(delay(this.simulateDelay));
    }
    
    return of({ success: true }).pipe(delay(this.simulateDelay));
  }

  // Test configuration methods
  setSimulateError(error: boolean): void {
    this.shouldError = error;
  }

  setSimulateDelay(delayMs: number): void {
    this.simulateDelay = delayMs;
  }

  // Additional helper method for testing
  resetMockData(): void {
    this.mockCountries = [
      { id: 1, countryName: 'United States', countryCode: 'US' },
      { id: 2, countryName: 'Canada', countryCode: 'CA' },
      { id: 3, countryName: 'Mexico', countryCode: 'MX' }
    ];
  }
}
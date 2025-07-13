import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Company } from '../modules/masters/company/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceMock {
  private companies: Company[] = [
    {
      id: '1',
      companyName: 'Acme Inc',
      companyCode: 'ACME',
      thirdPartyLogistics: true,
      address1: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      pin: '10001',
      country: 'USA',
      phone: '555-1234',
      email: 'info@acme.com',
      contactEmail: 'contact@acme.com',
      contactPartner: 'John Doe',
      mobileNo: '555-5678',
      baseCurrency: 'USD',
      vatTinNo: 'VAT123456',
      companyLogo: 'acme-logo.png'
    },
    {
      id: '2',
      companyName: 'Globex Corp',
      companyCode: 'GLBX',
      address: '456 Industry Ave',
      city: 'Springfield',
      state: 'IL',
      pin: '62701',
      country: 'USA',
      phone: '555-9876',
      email: 'info@globex.com',
      contactEmail: 'contact@globex.com',
      contactPartner: 'Jane Smith',
      mobileNo: '555-5432',
      baseCurrency: 'USD'
    }
  ];

  constructor() {}

  private simulateNetworkDelay<T>() {
    return delay<T>(Math.random() * 1000);
  }

  getCompanies(): Observable<Company[]> {
    return of<Company[]>(this.companies.slice()).pipe(
      this.simulateNetworkDelay<Company[]>()
    );
  }

  getCompany(id: string): Observable<Company> {
    const company = this.companies.find(c => c.id === id);
    if (!company) {
      return throwError(() => new Error('Company not found'));
    }
    return of<Company>({...company}).pipe(
      this.simulateNetworkDelay<Company>()
    );
  }

  createCompany(companyData: FormData | Company): Observable<Company> {
    const newCompany: Company = this.isFormData(companyData) 
      ? this.createFromFormData(companyData)
      : {...companyData, id: (this.companies.length + 1).toString()};

    this.companies.push(newCompany);
    return of<Company>(newCompany).pipe(
      this.simulateNetworkDelay<Company>()
    );
  }

  updateCompany(id: string, updates: Partial<Company>): Observable<Company> {
    const index = this.companies.findIndex(c => c.id === id);
    if (index === -1) {
      return throwError(() => new Error('Company not found'));
    }

    const updatedCompany = {...this.companies[index], ...updates};
    this.companies[index] = updatedCompany;
    return of<Company>(updatedCompany).pipe(
      this.simulateNetworkDelay<Company>()
    );
  }

  deleteCompany(id: string): Observable<void> {
    const index = this.companies.findIndex(c => c.id === id);
    if (index === -1) {
      return throwError(() => new Error('Company not found'));
    }

    this.companies.splice(index, 1);
    return of<void>(undefined).pipe(
      this.simulateNetworkDelay<void>()
    );
  }

  private isFormData(data: any): data is FormData {
    return data instanceof FormData;
  }

  private createFromFormData(formData: FormData): Company {
    return {
      id: (this.companies.length + 1).toString(),
      companyName: formData.get('companyName') as string || 'New Company',
      companyCode: formData.get('companyCode') as string || 'NEWCO',
      city: formData.get('city') as string || '',
      state: formData.get('state') as string || '',
      pin: formData.get('pin') as string || '',
      country: formData.get('country') as string || '',
      phone: formData.get('phone') as string || '',
      email: formData.get('email') as string || '',
      contactEmail: formData.get('contactEmail') as string || '',
      contactPartner: formData.get('contactPartner') as string || '',
      mobileNo: formData.get('mobileNo') as string || '',
    };
  }
}
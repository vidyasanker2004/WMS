import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['../../../../app.scss']
})
export class CreateCompany {
  companyForm: FormGroup;
  countries: string[] = ['India', 'USA', 'UK', 'Canada'];
  states: string[] = ['Karnataka', 'California', 'New York', 'Texas'];

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
  companyName: ['', Validators.required],
  thirdPartyLogistics: [false],  // Changed from jetPary
  address1: [''],
  address: ['', Validators.required],
  country: ['', Validators.required],
  pin: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  phonePrefix: ['+91'],
  phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  email: ['', [Validators.required, Validators.email]],
  website: [''],
  eccNo: [''],  // Changed from iccNo
  tinDate: [''],  // Removed hardcoded date
  cstDate: [''],  // Changed from citDate
  companyCode: ['', Validators.required],
  city: ['', Validators.required],
  state: ['', Validators.required],
  contactEmail: ['', [Validators.required, Validators.email]],
  contactPartner: ['', Validators.required],
  mobilePrefix: ['+91'],
  mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  baseCurrency: ['', Validators.required],  // Added required validator
  vatTinNo: [''],  // Changed from vbtTenNo
  cstNo: [''],  // Changed from cieNo
  companyLogo: [null]
});
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const formData = new FormData();
      Object.keys(this.companyForm.value).forEach(key => {
        if (key === 'companyLogo' && this.companyForm.value[key]) {
          formData.append(key, this.companyForm.value[key]);
        } else {
          formData.append(key, this.companyForm.value[key] || '');
        }
      });

      this.companyService.createCompany(formData).subscribe({
        next: () => this.router.navigate(['/home/company']),
        error: (error) => {
          console.error('Error creating company:', error);
          alert('Failed to create company. Please try again.');
        }
      });
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than or equal to 1MB.');
        input.value = '';
        return;
      }
      this.companyForm.patchValue({ companyLogo: file });
      this.companyForm.get('companyLogo')?.updateValueAndValidity();
    }
  }
}
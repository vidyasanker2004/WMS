import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyServiceMock } from '../../../../mock-api/CompanyService.mock';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  styleUrls: ['../../../../app.scss']
})
export class CreateCompany {
  companyForm: FormGroup;
  countries: string[] = ['India', 'USA', 'UK', 'Canada'];
  states: string[] = ['Karnataka', 'California', 'New York', 'Texas'];
  isLoading = false;
  

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,//CompanyServiceMock
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      companyCode: ['', Validators.required],
      thirdPartyLogistics: [false],
      address1: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      country: ['', Validators.required],
      phonePrefix: ['+91'],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      website: [''],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPartner: ['', Validators.required],
      mobilePrefix: ['+91'],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      baseCurrency: ['', Validators.required],
      vatTinNo: [''],
      cstNo: [''],
      eccNo: [''],
      tinDate: [''],
      cstDate: [''],
      companyLogo: [null]
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.isLoading = true;
      
      const formData = new FormData();
      const formValue = this.companyForm.value;
      
      // Append all form values to FormData
      Object.keys(formValue).forEach(key => {
        const value = formValue[key];
        if (value !== null && value !== undefined) {
          if (key === 'companyLogo' && value) {
            formData.append(key, value);
          } else if (value instanceof Date) {
            formData.append(key, value.toISOString());
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      this.companyService.createCompany(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/home/company']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error creating company:', error);
          alert('Failed to create company. Please try again.');
        }
      });
    } else {
      this.companyForm.markAllAsTouched();
      alert('Please fill all required fields correctly.');
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file size (1MB)
      if (file.size > 1048576) {
        alert('File size must be less than 1MB');
        input.value = '';
        return;
      }
      
      // Validate image dimensions would require creating an image element and checking
      // This would be asynchronous and more complex
      
      this.companyForm.patchValue({ companyLogo: file });
      this.companyForm.get('companyLogo')?.updateValueAndValidity();
    }
  }
}
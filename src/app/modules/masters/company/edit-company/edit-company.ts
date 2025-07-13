import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyServiceMock } from '../../../../mock-api/CompanyService.mock';

@Component({
  selector: 'app-edit-company',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './edit-company.html',
  styleUrls: ['../../../../app.scss']
})
export class EditCompany implements OnInit {
  companyForm: FormGroup;
  companyId: string = '';
  countries: string[] = ['India', 'USA', 'UK', 'Canada'];
  states: string[] = ['Karnataka', 'California', 'New York', 'Texas'];
  isLoading = false;
  isUpdating = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyServiceMock,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.companyId = this.route.snapshot.params['id'];
    this.loadCompanyData();
  }

  loadCompanyData(): void {
    this.isLoading = true;
    this.companyService.getCompany(this.companyId).subscribe({
      next: (company) => {
        this.companyForm.patchValue(company);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading company:', error);
        this.isLoading = false;
        alert('Failed to load company data. Please try again.');
      }
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.isUpdating = true;
      
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

      this.companyService.updateCompany(this.companyId, formData).subscribe({
        next: () => {
          this.isUpdating = false;
          this.router.navigate(['/home/company']);
        },
        error: (error) => {
          this.isUpdating = false;
          console.error('Error updating company:', error);
          alert('Failed to update company. Please try again.');
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
      
      this.companyForm.patchValue({ companyLogo: file });
      this.companyForm.get('companyLogo')?.updateValueAndValidity();
    }
  }
}
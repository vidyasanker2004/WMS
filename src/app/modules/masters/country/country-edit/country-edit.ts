import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../country.service';
import { Country } from '../country.model';
import { CountryServiceMock } from '../../../../mock-api/country.service.mock';

@Component({
  selector: 'app-country-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './country-edit.html',
  styleUrls: ['./country-edit.scss']
})
export class CountryEditComponent implements OnInit {
  FromBuilder: FormBuilder = new FormBuilder;
  
  countryForm = this.FromBuilder.group({
    countryName: ['', [Validators.required, Validators.minLength(3)]],
    countryCode: ['', [Validators.required, Validators.maxLength(3)]]
  });

  countryId!: number;
  isSubmitting = false;

  constructor(
    private countryService: CountryServiceMock,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countryId = +this.route.snapshot.params['id'];
    this.loadCountry();
  }

    // Add these to your component
  isLoading = false;
  loadError = false;
  submitSuccess = false;
  submitError = false;

  // Update your loadCountry method
  loadCountry(): void {
    this.isLoading = true;
    this.loadError = false;
    
    this.countryService.getCountry(this.countryId )
      .subscribe({
        next: (response) => {
          this.countryForm.patchValue({
            countryName: response.countryName,
            countryCode: response.countryCode
          });
          this.isLoading = false;
        },
        error: (err: Error) => {
          console.error('Failed to load country', err);
          this.isLoading = false;
          this.loadError = true;
          this.router.navigate(['/home/countries']);
        }
      });
  }

  // Update your onSubmit method
    onSubmit(): void {
      if (this.countryForm.invalid || this.isSubmitting) return;

      this.isSubmitting = true;
      this.submitError = false;
      this.submitSuccess = false;

      const updatedCountry = {
        id: this.countryId,
        ...this.countryForm.value
        
      } as Country;

      this.countryService.updateCountry( updatedCountry)
        .subscribe({
          next: () => {
            this.submitSuccess = true;
            setTimeout(() => {
              this.router.navigate(['/home/countries']);
            }, 1500); // Show success message for 1.5 seconds before navigating
          },
          error: (err: Error) => {
            console.error('Failed to update country', err);
            this.isSubmitting = false;
            this.submitError = true;
          }
        });
  }
}
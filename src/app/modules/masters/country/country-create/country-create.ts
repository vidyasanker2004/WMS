import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CountryService } from '../country.service';
import { Country, Countrymock } from '../country.model';
import { CountryServiceMock } from '../../../../mock-api/country.service.mock';

@Component({
  selector: 'app-country-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './country-create.html',
  styleUrls: ['../../../../app.scss']
})
export class CountryCreateComponent {
  FromBuilder: FormBuilder = new FormBuilder;
 

  constructor(
    private countryService: CountryServiceMock,
    private router: Router
  ) {}

   countryForm = this.FromBuilder.group({
    countryName: ['', [Validators.required, Validators.minLength(3)]],
    countryCode: ['', [Validators.required, Validators.maxLength(3)]]
  });

  onSubmit() {
  if (this.countryForm.valid) {
    this.countryService.createCountry(this.countryForm.value as Country)
      .subscribe({
        next: () => this.router.navigate(['/home/countries']),
        error: (err: Error) => console.error('Error creating country', err)
      });
  }
}
}
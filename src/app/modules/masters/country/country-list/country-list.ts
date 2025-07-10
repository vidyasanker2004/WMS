import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CountryService } from '../country.service';
import { CountryServiceMock } from '../../../../mock-api/country.service.mock';
import { Country, Countrymock } from '../country.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add required modules
  templateUrl: './country-list.html',
  styleUrls: ['../../../../app.scss']
})
export class CountryListComponent implements OnInit {
  countries: Countrymock[] = [];
  isLoading: boolean = true;
  isDeleting: boolean = false;
  
  constructor(
    private countryService: CountryServiceMock,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
  this.isLoading = true;
  this.countryService.getCountries().subscribe({
    next: (response) => {
      this.countries = response.result || []; 
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error loading countries:', error);
      this.isLoading = false;
      this.countries = [];
      
    }
  });
}

  editCountry(id: number) {
    this.router.navigate(['/home/countries/edit', id]);
  }

  deleteCountry(id: number) {
  if (confirm('Are you sure you want to delete this country?')) {
    this.isDeleting = true;
    
    this.countryService.deleteCountry(id).subscribe({
      next: () => {
        console.log('Country deleted successfully');
        this.loadCountries();
      },
      error: (error) => {
        console.error('Error deleting country:', error);
        alert('Failed to delete country. Please try again.');
      },
      complete: () => {
        this.isDeleting = false;
      }
    });
  }
}
}
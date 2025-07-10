import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CountryListComponent } from './country-list';
import { CountryService } from '../country.service';
import { CountryServiceMock } from './../../../../mock-api/country.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let mockService: CountryServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        RouterModule
      ],
      declarations: [CountryListComponent],
      providers: [
        { provide: CountryService, useClass: CountryServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(CountryService) as unknown as CountryServiceMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading state', fakeAsync(() => {
    component.loadCountries();
    expect(component.isLoading).toBeTrue();
    tick(200);
    expect(component.isLoading).toBeFalse();
  }));

  it('should handle connection timeout', fakeAsync(() => {
    mockService.setSimulateError(true);
    component.loadCountries();
    tick(200);
    
    expect(component.isLoading).toBeFalse();
    expect(component.countries.length).toBe(0);
  }));

  it('should load countries successfully', fakeAsync(() => {
    mockService.setSimulateError(false);
    component.loadCountries();
    tick(200);
    
    expect(component.countries.length).toBe(3);
    expect(component.countries[0].countryName).toBe('United States');
  }));

  it('should delete country successfully', fakeAsync(() => {
    mockService.setSimulateError(false);
    component.loadCountries();
    tick(200);
    
    const initialCount = component.countries.length;
    component.deleteCountry(1);
    tick(200);
    
    expect(component.countries.length).toBe(initialCount - 1);
  }));
});
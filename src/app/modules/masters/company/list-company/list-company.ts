import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-list-company',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list-company.html',
  styleUrls: ['../../../../app.scss']
})
export class ListCompany implements OnInit {
  isLoading: boolean = true;
  isDeleting: boolean = false;
  companies: any[] = []; // Original company data
  filteredCompanies: any[] = []; // Filtered company data for display
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.isLoading = true;
    this.companyService.getCompanies().subscribe({
      next: (data: any[]) => {
        this.companies = data;
        this.filteredCompanies = [...data];
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading companies:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilter() {
    if (!this.searchQuery) {
      this.filteredCompanies = [...this.companies];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredCompanies = this.companies.filter(company => 
        (company.companyName?.toLowerCase().includes(query)) ||
        (company.companyCode?.toLowerCase().includes(query)) ||
        (company.city?.toLowerCase().includes(query)) ||
        (company.state?.toLowerCase().includes(query)) ||
        (company.pin?.toString().includes(query)) ||
        (company.country?.toLowerCase().includes(query))
      );
    }
    this.currentPage = 1; // Reset to first page when filtering
  }

  get paginatedCompanies() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCompanies.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalEntries(): number {
    return this.filteredCompanies.length;
  }

  getToEntry(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalEntries);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredCompanies.length) {
      this.currentPage++;
    }
  }

  editCompany(id: string) {
    this.router.navigate(['/home/company/edit', id]);
  }

  deleteCompany(id: string) {
    if (this.isDeleting) return;
    
    if (confirm('Are you sure you want to delete this company?')) {
      this.isDeleting = true;
      this.companyService.deleteCompany(id).subscribe({
        next: () => {
          this.companies = this.companies.filter(company => company.id !== id);
          this.filteredCompanies = this.filteredCompanies.filter(company => company.id !== id);
          this.isDeleting = false;
        },
        error: (error: any) => {
          console.error('Error deleting company:', error);
          this.isDeleting = false;
        }
      });
    }
  }
}
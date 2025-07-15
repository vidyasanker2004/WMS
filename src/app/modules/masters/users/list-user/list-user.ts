import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../users.model';
import { UserService } from '../user.service';
import { MockUserService } from '../../../../mock-api/user.service.mock';
@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list-user.html',
  styleUrls: ['../../../../app.scss']
})
export class ListUser implements OnInit {
  isLoading: boolean = true;
  isDeleting: boolean = false;
  users: User[] = []; // Original User data
  filteredUsers: any[] = []; // Filtered User data for display
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  constructor(
    private userService: MockUserService, // Use MockUserService for testing
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.isLoading = true;
    this.userService.getCompanies().subscribe({
      next: (data: any[]) => {
        this.users = data;
        this.filteredUsers = [...data];
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilter() {
    if (!this.searchQuery) {
      this.filteredUsers = [...this.users];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter(user => 
        (user.username?.toLowerCase().includes(query)) ||
        (user.userCode?.toLowerCase().includes(query)) /* ||
        (user.city?.toLowerCase().includes(query)) ||
        (user.state?.toLowerCase().includes(query)) ||
        (user.pin?.toString().includes(query)) ||
        (user.country?.toLowerCase().includes(query)) */
      );
    }
    this.currentPage = 1; // Reset to first page when filtering
  }

  get paginatedCompanies() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalEntries(): number {
    return this.filteredUsers.length;
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
    if (this.currentPage * this.itemsPerPage < this.filteredUsers.length) {
      this.currentPage++;
    }
  }

  editUser(id: string) {
    this.router.navigate(['/home/user/edit', id]);
  }

  deleteUser(id: string) {
    if (this.isDeleting) return;
    
    if (confirm('Are you sure you want to delete this user?')) {
      this.isDeleting = true;
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(users => users.userID !== id);
          this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
          this.isDeleting = false;
        },
        error: (error: any) => {
          console.error('Error deleting user:', error);
          this.isDeleting = false;
        }
      });
    }
  }
}
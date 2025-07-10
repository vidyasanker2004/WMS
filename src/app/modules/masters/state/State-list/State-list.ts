import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StateService } from '../state.service';
import { State } from '../state.model';
import { Router } from '@angular/router';
import MockStateService from '../../../../mock-api/country.state.mock';

@Component({
  selector: 'app-state-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './State-list.html',
  styleUrls: ['../../../../app.scss']
})
export class StateListComponent implements OnInit {
  states: State[] = [];
  isLoading = false;
  errorMessage = '';
  
  constructor(
    private StateService: MockStateService, //use 'StateService' instead of 'MockStateService' for real api service
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStates();
  }

  loadStates(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.StateService.getStates().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.isSuccess && Array.isArray(response.result)) {
          this.states = response.result;
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load states. Please try again later.';
        console.error('Error fetching states:', err);
      }
    });
  }

  editState(id: number) {
    this.router.navigate(['/home/states/edit', id]);
  }

  deleteState(id: number) {
    if(confirm('Are you sure you want to delete this states?')) {
      this.StateService.deleteState(id).subscribe({
        next: () => this.loadStates(),
        error: (err: any) => console.error('Error deleting states', err)
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StateService } from '../state.service';
import { mockStates, State } from '../state.model';
import MockStateService from '../../../../mock-api/country.state.mock';

@Component({
  selector: 'app-state-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './state-edit.html',
  styleUrls: ['./state-edit.scss']
})
export class StateEditComponent implements OnInit {
  FromBuilder: FormBuilder = new FormBuilder;
  
  stateForm = this.FromBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    code: ['', [Validators.required, Validators.maxLength(3)]]
  });

  stateId!: number;
  isSubmitting = false;

  constructor(
    private StateService: MockStateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stateId = +this.route.snapshot.params['id'];
    this.loadState();
  }

  loadState(): void {
    this.StateService.getState(this.stateId)
      .subscribe({
        next: (state) => {
          this.stateForm.patchValue({
            name: state.stateName,
            code: state.stateCode
          });
        },
        error: (err: Error) => {
          console.error('Failed to load state', err);
          this.router.navigate(['/home/countries']);
        }
      });
  }

  onSubmit(): void {
    if (this.stateForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    const updatedState = {
      ...this.stateForm.value,
      id: this.stateId
    } as mockStates;

    this.StateService.updateState(this.stateId, updatedState)
      .subscribe({
        next: () => {
          this.router.navigate(['/home/states']);
        },
        error: (err: Error) => {
          console.error('Failed to update state', err);
          this.isSubmitting = false;
        }
      });
  }
}
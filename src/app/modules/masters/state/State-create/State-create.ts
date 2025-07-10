import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../state.service';
import { mockStates, State } from '../state.model';
import MockStateService from '../../../../mock-api/country.state.mock';

@Component({
  selector: 'app-country-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './state-create.html',
  styleUrls: ['./../../../../app.scss']
})
export class StateCreateComponent {
  FromBuilder: FormBuilder = new FormBuilder;
 

  constructor(
    private StateService: MockStateService,
    private router: Router
  ) {}

   stateForm = this.FromBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    code: ['', [Validators.required, Validators.maxLength(3)]]
  });

  onSubmit() {
    if (this.stateForm.valid) {
      this.StateService.createState(this.stateForm.value as State)
        .subscribe({
          next: () => this.router.navigate(['/home/states']),
          error: (err: Error) => console.error('Error creating state', err)
        });
    }
  }
}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { UserService } from '../user.service';
import { MockUserService } from '../../../../mock-api/user.service.mock';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  styleUrls: ['../../../../app.scss']
})
export class CreateUser {
  userForm: FormGroup;
  salutations: string[] = ['Mr', 'Ms', 'Mrs', 'Dr'];
  isLoading = false;
  groupOptions = [
  { value: 'SuperAdminUser', display: 'Super Admin User' },
  { value: 'InwardUser', display: 'Inward User' },
  { value: 'OutwardUser', display: 'Outward User' },
  { value: 'ReportUser', display: 'Report User' },
  { value: 'PackingUser', display: 'Packing User' },
  { value: 'PickingUser', display: 'Picking User' },
  { value: 'ShippingUser', display: 'Shipping User' },
  { value: 'QC', display: 'QC' },
  { value: 'Inventory Control Specialist', display: 'Inventory Control Specialist' },
  { value: 'SC Managers', display: 'SC Managers' }
];

  constructor(
  private fb: FormBuilder,
  private userService: MockUserService, // Use MockUserService for testing
  // private userService: UserService, // Uncomment this line to use the actual UserService
  private router: Router,
  private ngSelectConfig: NgSelectConfig
) {
  // Configure ng-select defaults
  this.ngSelectConfig.notFoundText = 'No items found';
  this.ngSelectConfig.appendTo = 'body';
  this.ngSelectConfig.typeToSearchText = 'Type to search';
  
  // Initialize the form with multi-select groupName
  this.userForm = this.fb.group({
    userName: ['', Validators.required],
    salutation: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    userCode: ['', Validators.required],
    userId: ['', Validators.required],
    groupName: [[] as string[], Validators.required] // Multi-select initialized as empty array
  });

  // Group options for the multi-select
  this.groupOptions = [
    { value: 'SuperAdminUser', display: 'Super Admin User' },
    { value: 'InwardUser', display: 'Inward User' },
    { value: 'OutwardUser', display: 'Outward User' },
    { value: 'ReportUser', display: 'Report User' },
    { value: 'PackingUser', display: 'Packing User' },
    { value: 'PickingUser', display: 'Picking User' },
    { value: 'ShippingUser', display: 'Shipping User' },
    { value: 'QC', display: 'QC' },
    { value: 'Inventory Control Specialist', display: 'Inventory Control Specialist' },
    { value: 'SC Managers', display: 'SC Managers' }
  ];
}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/home/user']); // Adjust the navigation path as needed
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error creating user:', error);
          alert('Failed to create user. Please try again.');
        }
      });
    } else {
      this.userForm.markAllAsTouched();
      alert('Please fill all required fields correctly.');
    }
  }

  onCancel(): void {
    this.router.navigate(['/home/user']); //navigate back to user list
  }
}
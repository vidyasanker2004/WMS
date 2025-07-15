/* import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { UserService } from '../user.service';
import { MockUserService } from '../../../../mock-api/user.service.mock';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['../../../../app.scss']
})
export class EditUser implements OnInit {
  userForm: FormGroup;
  salutations: string[] = ['Mr', 'Ms', 'Mrs', 'Dr'];
  isLoading = false;
  showPasswordField = false;
  userId: string = '';
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
    private route: ActivatedRoute,
    private ngSelectConfig: NgSelectConfig
  ) {
    // Configure ng-select defaults
    this.ngSelectConfig.notFoundText = 'No items found';
    this.ngSelectConfig.appendTo = 'body';
    this.ngSelectConfig.typeToSearchText = 'Type to search';
    
    // Initialize the form
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      salutation: ['', Validators.required],
      password: ['', [Validators.minLength(6)]],
      userCode: ['', Validators.required],
      userId: ['', Validators.required],
      groupName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.loadUserData(this.userId);
    }
  }

  loadUserData(userId: string): void {
    this.isLoading = true;
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          userName: user.username,
          salutation: user.salutation,
          userCode: user.userCode,
          userId: user.userID,
          groupName: user.role
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading user:', error);
        alert('Failed to load user data. Please try again.');
      }
    });
  }

  onResetPassword(): void {
    this.showPasswordField = true;
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      
      // Only include password if it was reset
      const formValue = { ...this.userForm.value };
      if (!this.showPasswordField) {
        delete formValue.password;
      }

      this.userService.updateUser(this.userId, formValue).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/home/user']); // Adjust the navigation path as needed
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error updating user:', error);
          alert('Failed to update user. Please try again.');
        }
      });
    } else {
      this.userForm.markAllAsTouched();
      alert('Please fill all required fields correctly.');
    }
  }

  onCancel(): void {
    this.router.navigate(['/home/user']); // Navigate back to user list
  }
} */
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { User } from '../modules/masters/users/users.model';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {
  private users: User[] = [
    {
      id: 1,
      userID: 'john.doe',
      password: 'password123',
      userCode: 'JD001',
      username: 'John Doe',
      role: 'admin',
      salutation: 'Mr',
      shortName: 'John',
      customerId: 1,
      warehouseId: 1,
      companyId: 1,
      isActive: true
    },
    {
      id: 2,
      userID: 'jane.smith',
      password: 'password456',
      userCode: 'JS002',
      username: 'Jane Smith',
      role: 'user',
      salutation: 'Ms',
      shortName: 'Jane',
      customerId: 2,
      warehouseId: 1,
      companyId: 1,
      isActive: true
    }
  ];

  private lastId = 2;

  constructor() {}

  private handleError(error: any) {
    console.error('Mock API Error:', error);
    return throwError(() => new Error('Something went wrong in mock service.'));
  }

  getCompanies(): Observable<User[]> {
    return of([...this.users]).pipe(
      delay(200),
      catchError(this.handleError)
    );
  }

  getUser(id: string): Observable<User> {
    const user = this.users.find(u => u.id === +id || u.userID === id);
    if (user) {
      return of({...user}).pipe(
        delay(100),
        catchError(this.handleError)
      );
    }
    return throwError(() => new Error('User not found'));
  }

  createUser(userData: any): Observable<User> {
    const newUser: User = {
      id: ++this.lastId,
      userID: userData.userId,
      password: userData.password,
      userCode: userData.userCode,
      username: userData.userName,
      role: userData.groupName || 'user',
      salutation: userData.salutation,
      shortName: userData.userName.split(' ')[0],
      customerId: 1,
      warehouseId: 1,
      companyId: 1,
      isActive: true
    };

    this.users.push(newUser);
    return of(newUser).pipe(
      delay(150),
      catchError(this.handleError)
    );
  }

  updateUser(id: string, updates: any): Observable<User> {
    const index = this.users.findIndex(u => u.id === +id || u.userID === id);
    
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }

    // Map the form field names to the User model properties
    const updatedUser = {
      ...this.users[index],
      username: updates.userName || this.users[index].username,
      salutation: updates.salutation || this.users[index].salutation,
      userCode: updates.userCode || this.users[index].userCode,
      userID: updates.userId || this.users[index].userID,
      role: updates.groupName || this.users[index].role
    };

    // Only update password if it was provided (reset)
    if (updates.password) {
      updatedUser.password = updates.password;
    }

    this.users[index] = updatedUser;
    return of({...this.users[index]}).pipe(
      delay(100),
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<void> {
    const index = this.users.findIndex(u => u.id === +id || u.userID === id);
    
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }

    this.users.splice(index, 1);
    return of(undefined).pipe(
      delay(100),
      catchError(this.handleError)
    );
  }
}
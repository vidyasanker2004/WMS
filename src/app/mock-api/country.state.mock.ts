import { of } from 'rxjs';
import { State } from '../modules/masters/state/state.model'; 
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' }) 
export default class MockStateService {
  private mockStates: State[] = [
    { id: 1, countryName: '', stateName: 'California', stateCode: 'CA' },
    { id: 2, countryName: '', stateName: 'Texas', stateCode: 'TX' },
    { id: 3, countryName: '', stateName: 'New York', stateCode: 'NY' }
  ];

  getStates() {
    return of({
      isSuccess: true,
      result: [...this.mockStates],
      message: 'States retrieved successfully'
    });
  }

  getState(id: number) {
    const state = this.mockStates.find(s => s.id === id);
    if (state) {
      return of(state);
    }
    throw new Error('State not found');
  }

  createState(state: State) {
    const newState = {
      ...state,
      id: this.mockStates.length + 1
    };
    this.mockStates.push(newState);
    return of(newState);
  }

  updateState(id: number, state: State) {
    const index = this.mockStates.findIndex(s => s.id === id);
    if (index !== -1) {
      this.mockStates[index] = { ...state, id };
      return of(this.mockStates[index]);
    }
    throw new Error('State not found');
  }

  deleteState(id: number) {
    const index = this.mockStates.findIndex(s => s.id === id);
    if (index !== -1) {
      this.mockStates.splice(index, 1);
      return of({ isSuccess: true, message: 'State deleted successfully' });
    }
    throw new Error('State not found');
  }
}
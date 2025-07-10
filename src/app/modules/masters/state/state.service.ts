import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, State } from './state.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private apiUrl = `${environment.apiUrl}/State`; // This would be your real API endpoint


  constructor(private http: HttpClient) {}

  getStates(): Observable<ApiResponse<State[]>> {
    return this.http.get<ApiResponse<State[]>>(this.apiUrl);

  }
  

  getState(id: number): Observable<any> {
  return this.http.get<State>(`${this.apiUrl}/${id}`);
  }

  createState(State: State): Observable<State> {
     return this.http.post<State>(this.apiUrl, State);
  }

  updateState(id: number, State: State): Observable<State> {
     return this.http.put<State>(`${this.apiUrl}/${id}`, State);
  }

  deleteState(id: number): Observable<void> {
 return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
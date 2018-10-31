import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { IEmployee } from '../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${environment.apiUrl}/employees/`);
  }

  editEmployee(employee: IEmployee): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/employees/`, employee);
  }

  createEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(`${environment.apiUrl}/employees/`, { employee });
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/employees/`, { params: { id: id } });
  }
}

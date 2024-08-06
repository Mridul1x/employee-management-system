import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'http://localhost:5000/api/employee';
  }

  addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseURL, emp);
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseURL);
  }

  updateEmployee(id: string, emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseURL}/${id}`, emp);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}

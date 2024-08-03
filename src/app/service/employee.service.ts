import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

// http://localhost:5000/api/employee

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  addEmpURL: string;
  getEmpURL: string;

  constructor(private http: HttpClient) {
    this.addEmpURL = 'http://localhost:5000/api/employee';
    this.getEmpURL = 'http://localhost:5000/api/employee';
  }

  addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.addEmpURL, emp);
  }
  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getEmpURL);
  }
}

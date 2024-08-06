import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  empDetail!: FormGroup;
  empObj: Employee = new Employee();
  empList: Employee[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
    this.empDetail = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', Validators.required],
    });
  }

  addEmployee() {
    if (this.empDetail.invalid) {
      this.empDetail.markAllAsTouched();
      return;
    }

    this.empObj.name = this.empDetail.value.name;
    this.empObj.salary = this.empDetail.value.salary;
    this.empObj.email = this.empDetail.value.email;

    this.empService.addEmployee(this.empObj).subscribe(
      (res) => {
        this.getAllEmployee();
        this.empDetail.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(
      (res) => {
        this.empList = res;
      },
      (err) => {
        console.log('error while fetching data.');
      }
    );
  }

  editEmployee(emp: Employee) {
    this.empDetail.controls['id'].setValue(emp._id); // Ensure you use the correct ID field
    this.empDetail.controls['name'].setValue(emp.name);
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['salary'].setValue(emp.salary);
  }

  updateEmployee() {
    this.empObj._id = this.empDetail.value.id;
    this.empObj.name = this.empDetail.value.name;
    this.empObj.salary = this.empDetail.value.salary;
    this.empObj.email = this.empDetail.value.email;

    this.empService.updateEmployee(this.empObj._id!, this.empObj).subscribe(
      (res) => {
        console.log(res);
        this.getAllEmployee();
        this.empDetail.reset(); // Reset form after update
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteEmployee(id: string) {
    this.empService.deleteEmployee(id).subscribe(
      (res) => {
        console.log(res);
        alert('Employee deleted successfully');
        this.getAllEmployee();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

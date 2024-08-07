import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  empDetail!: FormGroup;
  empObj: Employee = new Employee();
  empList: Employee[] = [];
  searchTerm: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private toastr: ToastrService // Injecting ToastrService
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
        this.toastr.success('Employee Added successfully', 'Success');
        this.getAllEmployee();
        this.empDetail.reset();
      },
      (err) => {
        this.toastr.error('Failed to add Employee');
        console.log(err);
      }
    );
  }

  getAllEmployee(): void {
    this.empService.getAllEmployee().subscribe((employees: Employee[]) => {
      this.empList = employees;
    });
  }

  onSearchChange(searchValue: string): void {
    this.searchTerm = searchValue;
    if (searchValue) {
      this.empList = this.empList.filter((emp) =>
        emp.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.getAllEmployee();
    }
  }

  editEmployee(emp: Employee) {
    this.empDetail.controls['id'].setValue(emp._id);
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
        this.toastr.success('Employee Updated successfully', 'Success');
        console.log(res);
        this.getAllEmployee();
        this.empDetail.reset();
      },
      (err) => {
        this.toastr.error('Failed to update employee');
        console.log(err);
      }
    );
  }

  deleteEmployee(id: string) {
    this.empService.deleteEmployee(id).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Employee Deleted successfully', 'Success');
        this.getAllEmployee();
      },
      (err) => {
        this.toastr.error('Failed to delete employee', 'Delete');
        console.log(err);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { IEmployee } from './../core/interfaces';
import { DetailsComponent } from './../details/details.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  page = 1;

  employees: IEmployee[] = [{
    id: (+(Date.now()) + 1).toString(),
    name: 'Patrick',
    birthDate: new Date(),
    occupation: 'carpenter',
    salary: 1700
  },
  {
    id: (+(Date.now()) - 1).toString(),
    name: 'Joshua',
    birthDate: new Date(),
    occupation: 'fisherman',
    salary: 950
  },
  {
    id: (+(Date.now())).toString(),
    name: 'Justine',
    birthDate: new Date(),
    occupation: 'doctor',
    salary: 2900
  }
  ];
  constructor(private modalService: NgbModal,
    public translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  ngOnInit() {
    const employees = localStorage.getItem('employees');
    if (employees) {
      this.employees = JSON.parse(employees);
    }
  }

  deleteEmployee(id: string) {
    this.employees.splice(this.employees.findIndex(employee => employee.id === id), 1);
    this.storeEmployees();
  }

  editEmployee(id: string) {
    const modalRef = this.modalService.open(DetailsComponent);
    modalRef.componentInstance.employee = this.employees.find(employee => employee.id === id);
    modalRef.componentInstance.changes
      .subscribe(_ => {
        this.storeEmployees();
      });
  }

  createEmployee() {
    const modalRef = this.modalService.open(DetailsComponent);
    modalRef.componentInstance.changes
      .subscribe(employee => {
        this.employees.push(
          {
            id: (+(Date.now())).toString(),
            ...employee
          });
        this.storeEmployees();
      });
  }

  storeEmployees() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  changeLang() {
    this.translateService.use(this.translateService.currentLang === 'en' ? 'ru' : 'en');
  }
}

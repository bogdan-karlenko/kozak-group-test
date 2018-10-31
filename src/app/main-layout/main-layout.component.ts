import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/switchMap';

import { IEmployee } from './../core/interfaces';
import { DetailsComponent } from './../details/details.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  page = 1;

  employees: IEmployee[] = [];

  constructor(
    private modalService: NgbModal,
    public translateService: TranslateService,
    private dataService: DataService
  ) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  ngOnInit() {
    this.dataService.getEmployees()
      .subscribe(
        employees => {
          this.employees = employees;
        },
        err => console.log(err));
  }

  deleteEmployee(id: string) {
    this.dataService.deleteEmployee(id)
      .subscribe(_ => {
        this.employees.splice(this.employees.findIndex(employee => employee.id === id), 1);
      },
        err => console.log(err));
  }

  editEmployee(id: string) {
    const modalRef = this.modalService.open(DetailsComponent);
    modalRef.componentInstance.employee = this.employees.find(employee => employee.id === id);
    modalRef.componentInstance.changes
      .switchMap(employee => this.dataService.editEmployee(employee))
      .switchMap(_ => this.dataService.getEmployees())
      .subscribe(employees => {
        this.employees = employees;
      },
        err => console.log(err));
  }

  createEmployee() {
    const modalRef = this.modalService.open(DetailsComponent);
    modalRef.componentInstance.changes
      .switchMap(employee => this.dataService.createEmployee(employee))
      .subscribe(employee => {
        this.employees.push(employee);
      });
  }

  changeLang() {
    this.translateService.use(this.translateService.currentLang === 'en' ? 'ru' : 'en');
  }
}

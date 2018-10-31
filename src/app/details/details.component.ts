import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { IEmployee } from './../core/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() employee: IEmployee;
  @Output() changes = new EventEmitter();

  currentEmployee: IEmployee;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.currentEmployee = { ...this.employee };
  }

  onDateSelect(date: NgbDate) {
    this.currentEmployee.birthDate = new Date(date.year, date.month, date.day);
  }

  saveEmployee() {
    if (this.employee) {
      Object.keys(this.employee)
        .forEach(key => {
          this.employee[key] = this.currentEmployee[key];
        });
      this.changes.emit();
    } else {
      this.changes.emit(this.currentEmployee);
    }
    this.activeModal.close();
  }

  closeModal() {
    this.activeModal.close();
  }

}

import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appPattern]'
})
export class PatternDirective {

  constructor(private el: ElementRef) { }

  @Input() allowNumbers: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent>event;
      if (e.key.length === 1 && (this.allowNumbers ? /\D/ : /\d/).test(e.key)) {
        e.preventDefault();
      }
    }
  }

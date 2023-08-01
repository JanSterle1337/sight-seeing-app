import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMapDetail]',
  
})
export class MapDetailDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-castle-details',
  templateUrl: './map-castle-details.component.html',
  styleUrls: ['./map-castle-details.component.css']
})
export class MapCastleDetailsComponent {
  @Input() dataFromParent: any;

  dynamicId: string = 'castle-details-info'
  

  helloChild() {
    console.log("Hello child");
  }



}

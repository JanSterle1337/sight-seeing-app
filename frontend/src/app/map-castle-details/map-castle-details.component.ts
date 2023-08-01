import { Component, Input } from '@angular/core';
import { MapCastleDetailsBuilderService } from '../service/map-castle-details-builder.service';

@Component({
  selector: 'app-map-castle-details',
  templateUrl: './map-castle-details.component.html',
  styleUrls: ['./map-castle-details.component.css']
})
export class MapCastleDetailsComponent {
  @Input() dataFromParent: any;

  dynamicId: string = 'castle-details-info'

  constructor(private mapCastleDetailsBuilderService: MapCastleDetailsBuilderService) { }
  
  helloChild() {
    console.log("Hello child");
  }

  close() {
    this.mapCastleDetailsBuilderService.closeSelf();
  }


}

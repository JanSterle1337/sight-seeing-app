import { Component, Input } from '@angular/core';
import { MapCastleDetailsBuilderService } from '../service/map-castle-details-builder.service';
import { Castle } from '../entity/Castle';
import { CastleService } from '../service/castle.service';

@Component({
  selector: 'app-map-castle-details',
  templateUrl: './map-castle-details.component.html',
  styleUrls: ['./map-castle-details.component.css']
})
export class MapCastleDetailsComponent {

  @Input() castle?: Castle;

  dynamicId: string = 'castle-details-info'

  constructor(
    private mapCastleDetailsBuilderService: MapCastleDetailsBuilderService,
    private castleService: CastleService
    ) 
    { }



  close() {
    this.mapCastleDetailsBuilderService.closeSelf();
  }

  getSpecificCastle(id: number): void {
    this.castleService.getCastle(id)
      .subscribe(castle => this.castle = castle)
  }


}

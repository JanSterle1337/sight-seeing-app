import { 
  Component, 
  OnInit,  
  ComponentRef,
  ViewEncapsulation
} from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { DragPan, MouseWheelZoom } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { LocationService } from '../service/location.service';
import { catchError, from, tap } from 'rxjs';
import { CastleService } from '../service/castle.service';
import { Castle } from '../entity/Castle';
import { MarkerOverlayConfigurator } from '../utility/MarkerOverlayConfigurator';
import { MapCastleDetailsBuilderService } from '../service/map-castle-details-builder.service';
import { MapCastleDetailsComponent } from '../map-castle-details/map-castle-details.component';

@Component({
  selector: 'app-map, [cl-map]',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'cl-map' }
})

export class MapComponent implements OnInit {

  currLatitude: number =  46.056946;
  currLongitude: number = 14.505751;

  castles: Castle[] = [];
  zoomLevel: number = 9;
  map: Map;

  private componentsReferences: ComponentRef<MapCastleDetailsComponent>[] = [];

  markerOverlays: {
    'smaller': Overlay[];
    'bigger':  Overlay[];
  }

  constructor(
    private locationService: LocationService, 
    private castleService: CastleService,
    private markerOverlayConfigurator: MarkerOverlayConfigurator,
    private mapCastleDetailsBuilderService: MapCastleDetailsBuilderService,
    ) 
  { }

  ngOnInit() {

    this.getCastles().subscribe(castles => {
      this.castles = castles;
      this.initMap();
      //this.mapCastleDetailsBuilderService.open('Hello we make new component!');
    });
   
  }

  initMap() {

    const osm = this.initOsm();
    console.log("In initMap", this.currLatitude, this.currLongitude);

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: osm
        })
      ],
      view: new View({
        center: fromLonLat([this.currLongitude,this.currLatitude]), // Set the center to Ljubljana, Slovenia
        zoom: this.zoomLevel, // Set the zoom level (adjust as needed)
      }),
      interactions: [
        new DragPan(),
        new MouseWheelZoom()
      ],
      controls: []
    });

     this.markerOverlays = this.markerOverlayConfigurator.configureCastleOverlay(this.castles);

     console.log("Hello")

     this.markerOverlays.smaller.map((marker) => {
      marker.getElement()?.addEventListener('click', () => {
        console.log("Baje da smo kliklne na grad iz druzga dela kode");
         // @ts-ignore: Object is possibly 'null'

        if (this.componentsReferences.length > 0) {

          for (let i = 0; i < this.componentsReferences.length; i++) {
            this.mapCastleDetailsBuilderService.close(this.componentsReferences[i]);
          }

          console.log("Dolzina je: ", this.componentsReferences.length);
          console.log("Odstranjujejmo")
        }

        // @ts-ignore: Object is possibly 'null'
        this.componentsReferences.push(this.mapCastleDetailsBuilderService.open(marker.getId()?.toString()));
      });
      //console.log("Marker",marker);
      this.map.addOverlay(marker);
     });

    this.map.addInteraction(
      new DragPan()
    )

    this.map.addInteraction(
      new MouseWheelZoom()
    )

  }

  initOsm(): OSM {
    const osmSource = new OSM();
    osmSource.setAttributions([]);

    return osmSource
  }

  getPositionData() {
    return from(this.locationService.getPosition()).pipe(
      catchError((error) => {
        console.error('Error while getting position: ', error);
        return [];
      }),
      tap((position) => {
        this.currLongitude = position.lng;
        this.currLatitude = position.lat;
      })
    );
  }

  getCastles() {
    return this.castleService.getAllCastles();
  }

}

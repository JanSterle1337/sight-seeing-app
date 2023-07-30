import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { DragPan, MouseWheelZoom } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { LocationService } from '../service/location.service';
import { MarkerConfigurator } from '../utility/MarkerConfigurator';
import { catchError, from, tap } from 'rxjs';
import { CASTLES } from '../mock-castles'
import { CastleService } from '../service/castle.service';
import { Castle } from '../entity/Castle';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  currLatitude: number =  0;
  currLongitude: number = 0;
  castles: Castle[] = [];

  constructor(
    private locationService: LocationService, 
    private markerConfigurator: MarkerConfigurator,
    private castleService: CastleService
    ) 
  {
    console.log("constructor")

  }

  ngOnInit() {
    console.log("ngOnInit");

    this.getCastles();

    this.getPositionData().subscribe(() => {
      console.log("Current lattitude and longitude values:", this.currLatitude, this.currLongitude);
      this.initMap();
    });
   
  }

  initMap() {

    const osm = this.initOsm();
    console.log("In initMap", this.currLatitude, this.currLongitude);

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: osm
        })
      ],
      view: new View({
        center: fromLonLat([this.currLongitude,this.currLatitude]), // Set the center to Ljubljana, Slovenia
        zoom: 13, // Set the zoom level (adjust as needed)
      }),
      interactions: [
        new DragPan(),
        new MouseWheelZoom()
      ],
      controls: []
    });

    const marker1 = this.markerConfigurator.newDefaultMarker();

    const photoMarker = this.markerConfigurator.newLogoMarker();
    console.log(photoMarker);

    const markerOverlays = this.castles.map((castle) => {
  
      const photoMarker = this.markerConfigurator.newLogoMarker();

      const markerOverlay = new Overlay({
        element: photoMarker,
        position: fromLonLat([castle.longitude, castle.latitude]),
        positioning: 'center-center',
        stopEvent: false
      });

      map.addOverlay(markerOverlay);
      return markerOverlay;
    })


    map.addInteraction(
      new DragPan()
    )

    map.addInteraction(
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

  getCastles(): void {
    this.castleService.getAllCastles().subscribe(
      (data) => {
        this.castles = data;
        console.log(this.castles);
      },
      (error) => {
        console.error('Error fetching castles: ', error);
      }
    )
  }

}

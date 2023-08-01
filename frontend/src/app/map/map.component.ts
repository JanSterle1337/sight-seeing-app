import { Component, OnInit, ViewContainerRef, ApplicationRef, EnvironmentInjector, ComponentRef } from '@angular/core';
import { Map, Observable, View } from 'ol';
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
import { MarkerOverlayConfigurator } from '../utility/MarkerOverlayConfigurator';
import { ToastService } from '../service/toast.service';
import { MapCastleDetailsComponent } from '../map-castle-details/map-castle-details.component';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  currLatitude: number =  46.056946;
  currLongitude: number = 14.505751;

  castles: Castle[] = [];
  zoomLevel: number = 9;
  map: Map;

  private componentsReferences: ComponentRef<MapCastleDetailsComponent>[]

  markerOverlays: {
    'smaller': Overlay[];
    'bigger':  Overlay[];
  }

  constructor(
    private locationService: LocationService, 
    private markerConfigurator: MarkerConfigurator,
    private castleService: CastleService,
    private markerOverlayConfigurator: MarkerOverlayConfigurator,
    private viewContainerRef: ViewContainerRef,
    private toastService: ToastService,
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
    ) 
  { }

  ngOnInit() {

    this.getCastles().subscribe(castles => {
      this.castles = castles;
      this.initMap();
      //this.toastService.open('Hello we make new component!');
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
      console.log("Marker",marker);
      this.map.addOverlay(marker);
     });

    this.map.addInteraction(
      new DragPan()
    )

    this.map.addInteraction(
      new MouseWheelZoom()
    )

    this.map.on('moveend', () => {
      // @ts-ignore: Object is possibly 'null'   
      if (this.map.getView().getZoom() > 12) {
        //gremo dat tavelke ikone

        const overlays: Overlay[] = this.map.getOverlays().getArray();

        overlays.forEach(overlay => {
       
          // @ts-ignore: Object is possibly 'null'
          overlay.getElement().addEventListener('click', () => {

            // @ts-ignore: Object is possibly 'null'
            this.toastService.open(overlay.getId()?.toString());

            console.log(overlay.getId())
            console.log("Klik na grad");
          })
          this.map.removeOverlay(overlay);
          
        })

        this.markerOverlays.bigger.forEach(biggerOverlay => this.map.addOverlay(biggerOverlay));

        // @ts-ignore: Object is possibly 'null'
      } else if (this.map.getView().getZoom() <= 12) {
 
        const overlays: Overlay[] = this.map.getOverlays().getArray();

        overlays.forEach(overlay => {


          // @ts-ignore: Object is possibly 'null'
          overlay.getElement().addEventListener('click', () => {
            const castleId = overlay.getId()?.toString().split("-").pop();
            

            // @ts-ignore: Object is possibly 'null'
            this.toastService.open(overlay.getId()?.toString());
            //const overlayElement = overlay.getElement();

            console.log(overlay.getId())
            console.log("Klik na grad");
          })

          this.map.removeOverlay(overlay);
          
        })

        this.markerOverlays.smaller.forEach(smallerOverlay => this.map.addOverlay(smallerOverlay));
      }
    })

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

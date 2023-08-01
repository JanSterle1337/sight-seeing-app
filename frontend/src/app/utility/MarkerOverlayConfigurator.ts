import { Injectable } from "@angular/core";
import { Castle } from "../entity/Castle";
import { MarkerConfigurator } from "./MarkerConfigurator";
import Overlay from 'ol/Overlay';
import { fromLonLat } from "ol/proj";

@Injectable({
    providedIn: 'root'
})

export class MarkerOverlayConfigurator {

    constructor(private markerConfigurator: MarkerConfigurator) { }

    configureCastleOverlay(castles: Castle[]) {

       let castleSmallerMarkerOverlays: Overlay[] = [];
       let castleBigMarkerOverlays: Overlay[] = [];

        castles.map((castle) => {
            const smallPhotoMarker = this.markerConfigurator.newSmallCastleLogoMarker();
            smallPhotoMarker.setAttribute("id", "small-icon-castle-"+castle.id);
            const bigPhotoMarker = this.markerConfigurator.newBigCastleLogoMarker();
            bigPhotoMarker.setAttribute("id", "big-icon-castle-"+castle.id);

            const smallMarkerOverlay = new Overlay({
                id: 'small-icon-castle-'+ castle.id,
                element: smallPhotoMarker,
                position: fromLonLat([castle.longitude, castle.latitude]),
                positioning: 'center-center',
                stopEvent: false
              });
        
              const bigMarkerOverlay = new Overlay({
                id: 'big-icon-castle-' + castle.id,
                element: bigPhotoMarker,
                position: fromLonLat([castle.longitude, castle.latitude]),
                positioning: 'center-center',
                stopEvent: false
              });

              castleSmallerMarkerOverlays.push(smallMarkerOverlay);
              castleBigMarkerOverlays.push(bigMarkerOverlay);

        })

        return {
            smaller: castleSmallerMarkerOverlays,
            bigger: castleBigMarkerOverlays
        }

    }
}
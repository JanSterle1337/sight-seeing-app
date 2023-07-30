import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class MarkerConfigurator {

    constructor() {}

    newMarker(
        className: string,
        width: string,
        height: string,
        zIndex: string,
        background: string,
        borderRadius: string
    ): HTMLDivElement {

       const markerElement: HTMLDivElement = document.createElement('div');

       markerElement.className = className;
       markerElement.style.width = width;
       markerElement.style.height = height;
       markerElement.style.zIndex = zIndex;
       markerElement.style.background= background;
       markerElement.style.borderRadius= borderRadius;

       return markerElement;
    }

    newLogoMarker(): HTMLImageElement {

        const logoMarkerElement: HTMLImageElement = document.createElement('img');
        logoMarkerElement.className = 'marker';
        logoMarkerElement.style.width = '20px';
        logoMarkerElement.src = '../../assets/mapLogos/castle.png';
        logoMarkerElement.style.height = '20px';
        logoMarkerElement.style.zIndex = '9999';
        //logoMarkerElement.style.background='red';
        //logoMarkerElement.style.borderRadius='50%';

        return logoMarkerElement;
    }

    newDefaultMarker(): HTMLDivElement {

        const markerElement: HTMLDivElement = document.createElement('div');

       markerElement.className = 'marker';
       markerElement.style.width = '20px';
       markerElement.style.height = '20px';
       markerElement.style.zIndex = '9999';
       markerElement.style.background='red';
       markerElement.style.borderRadius='50%';

       return markerElement
    }

}
import { 
  Injectable,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  ComponentRef
} 
from '@angular/core';
import { MapCastleDetailsComponent } from '../map-castle-details/map-castle-details.component';
import { MapDetailDirective } from '../map-detail.directive';

@Injectable({
  providedIn: 'root'
})
export class MapCastleDetailsBuilderService {

  private componentRef: ComponentRef<MapCastleDetailsComponent>

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) { }

    open(elementId: string): ComponentRef<MapCastleDetailsComponent> {

      this.componentRef = createComponent(MapCastleDetailsComponent, { //kreiram komponento
        environmentInjector: this.injector
      });

      let castleId = elementId.split("-").pop() //dobim id od grada k sm ga kliknu;
      // @ts-ignore: Object is possibly 'null'
      const imgElement = document.getElementById(elementId) //dobimo dejanske img element od ikone;
      const parentDiv = imgElement?.parentNode //dobim parent element od imga;

      parentDiv?.appendChild(this.componentRef.location.nativeElement); //use je pobrisano hocm appendad mojo novo komponento
      this.appRef.attachView(this.componentRef.hostView) //jo prkazem;

      return this.componentRef;
    }

    close(componentRef: ComponentRef<MapCastleDetailsComponent>) {

      componentRef.destroy();
    }


    closeSelf() {
      this.componentRef.destroy();
    }

}

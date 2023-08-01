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
export class ToastService {

  private componentRef: ComponentRef<MapCastleDetailsComponent>

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) { }

    open(elementId: string): void {

      this.componentRef = createComponent(MapCastleDetailsComponent, {
        environmentInjector: this.injector
      });

      let castleId = elementId.split("-").pop();

      // @ts-ignore: Object is possibly 'null'
      const imgElement = document.getElementById(elementId);

      


      const newButton = document.createElement('button');
      newButton.addEventListener('click', () => {
        this.close();
      })
      console.log(imgElement)
      const newDiv = document.createElement('div');
      newDiv.innerText = 'New div element';

      const parentDiv = imgElement?.parentNode;

      while (parentDiv?.firstChild !== imgElement) {
        
        console.log("REMOVAMO: ", parentDiv?.firstChild);
        this.componentRef.destroy();
        // @ts-ignore: Object is possibly 'null'
        parentDiv?.removeChild(parentDiv.firstChild);
      }

      parentDiv?.insertBefore(newButton, imgElement);
      parentDiv?.insertBefore(newDiv, imgElement);
      parentDiv?.appendChild(this.componentRef.location.nativeElement);
    
      this.appRef.attachView(this.componentRef.hostView);
     
    }

    close() {
      this.componentRef.destroy();
    }

}

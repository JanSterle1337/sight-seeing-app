import { Component, ViewEncapsulation } from '@angular/core';
import { Castle } from 'src/app/entity/Castle';
import { CastleService } from 'src/app/service/castle.service';

@Component({
  selector: 'app-generator, [cl-generator]',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'cl-generator' }
})
export class GeneratorComponent {

  castles: Castle[] = [];

  constructor(private castleService: CastleService) { }

  showAllCastles(): void {
    this.castleService.getAllCastles()
      .subscribe(castles => this.castles = castles);
  }

  printCastlesConsole() {
    console.log(this.castles);
  }

}

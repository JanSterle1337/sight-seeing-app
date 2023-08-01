import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCastleDetailsComponent } from './map-castle-details.component';

describe('MapCastleDetailsComponent', () => {
  let component: MapCastleDetailsComponent;
  let fixture: ComponentFixture<MapCastleDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapCastleDetailsComponent]
    });
    fixture = TestBed.createComponent(MapCastleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

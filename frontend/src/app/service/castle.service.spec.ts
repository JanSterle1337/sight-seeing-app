import { TestBed } from '@angular/core/testing';

import { CastleService } from './castle.service';

describe('CastleService', () => {
  let service: CastleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CastleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

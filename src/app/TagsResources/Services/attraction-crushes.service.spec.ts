import { TestBed } from '@angular/core/testing';

import { AttractionCrushesService } from './attraction-crushes.service';

describe('AttractionCrushesService', () => {
  let service: AttractionCrushesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(AttractionCrushesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

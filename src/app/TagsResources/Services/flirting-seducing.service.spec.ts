import { TestBed } from '@angular/core/testing';

import { FlirtingSeducingService } from './flirting-seducing.service';

describe('FlirtingSeducingService', () => {
  let service: FlirtingSeducingService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(FlirtingSeducingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

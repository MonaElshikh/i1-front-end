import { TestBed } from '@angular/core/testing';

import { DatingCourtshipService } from './dating-courtship.service';

describe('DatingCourtshipService', () => {
  let service: DatingCourtshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(DatingCourtshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

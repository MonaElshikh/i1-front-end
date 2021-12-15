import { TestBed } from '@angular/core/testing';

import { InfidelityCheatingService } from './infidelity-cheating.service';

describe('InfidelityCheatingService', () => {
  let service: InfidelityCheatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(InfidelityCheatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PlansService } from './plans.service';

describe('PlansService', () => {
  let service: PlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(PlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

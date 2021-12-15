import { TestBed } from '@angular/core/testing';

import { SinglesUnattachedService } from './singles-unattached.service';

describe('SinglesUnattachedService', () => {
  let service: SinglesUnattachedService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(SinglesUnattachedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

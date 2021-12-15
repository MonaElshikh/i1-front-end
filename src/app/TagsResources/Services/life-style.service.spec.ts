import { TestBed } from '@angular/core/testing';

import { LifeStyleService } from './life-style.service';

describe('LifeStyleService', () => {
  let service: LifeStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(LifeStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HeartbreaksBreakupsService } from './heartbreaks-breakups.service';

describe('HeartbreaksBreakupsService', () => {
  let service: HeartbreaksBreakupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(HeartbreaksBreakupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

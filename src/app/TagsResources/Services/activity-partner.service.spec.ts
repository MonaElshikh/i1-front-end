import { TestBed } from '@angular/core/testing';

import { ActivityPartnerService } from './activity-partner.service';

describe('ActivityPartnerService', () => {
  let service: ActivityPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(ActivityPartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

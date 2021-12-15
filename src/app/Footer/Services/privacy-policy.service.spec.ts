import { TestBed } from '@angular/core/testing';

import { PrivacyPolicyService } from './privacy-policy.service';

describe('PrivacyPolicyService', () => {
  let service: PrivacyPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(PrivacyPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserAgreementService } from './user-agreement.service';

describe('UserAgreementService', () => {
  let service: UserAgreementService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(UserAgreementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

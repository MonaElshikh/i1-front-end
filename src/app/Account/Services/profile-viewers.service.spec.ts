import { TestBed } from '@angular/core/testing';

import { ProfileViewersService } from './profile-viewers.service';

describe('ProfileViewersService', () => {
  let service: ProfileViewersService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(ProfileViewersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

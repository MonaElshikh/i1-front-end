import { TestBed } from '@angular/core/testing';

import { ProfilesLikedMeService } from './profiles-liked-me.service';

describe('ProfilesLikedMeService', () => {
  let service: ProfilesLikedMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(ProfilesLikedMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

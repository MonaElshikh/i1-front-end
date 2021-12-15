import { TestBed } from '@angular/core/testing';

import { ProfilesILikedService } from './profiles-iliked.service';

describe('ProfilesILikedService', () => {
  let service: ProfilesILikedService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(ProfilesILikedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

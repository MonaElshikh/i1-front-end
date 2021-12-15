import { TestBed } from '@angular/core/testing';

import { ProfilesFavMeService } from './profiles-fav-me.service';

describe('ProfilesFavMeService', () => {
  let service: ProfilesFavMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(ProfilesFavMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GetProfileByUnameService } from './get-profile-by-uname.service';

describe('GetProfileByUnameService', () => {
  let service: GetProfileByUnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(GetProfileByUnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

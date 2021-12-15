import { TestBed } from '@angular/core/testing';

import { JustFriendsService } from './just-friends.service';

describe('JustFriendsService', () => {
  let service: JustFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(JustFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { IsLikedService } from './is-liked.service';

describe('IsLikedService', () => {
  let service: IsLikedService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(IsLikedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

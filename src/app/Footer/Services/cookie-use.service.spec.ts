import { TestBed } from '@angular/core/testing';

import { CookieUseService } from './cookie-use.service';

describe('CookieUseService', () => {
  let service: CookieUseService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(CookieUseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

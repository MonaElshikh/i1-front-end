import { TestBed } from '@angular/core/testing';

import { CareersService } from './careers.service';

describe('CareersService', () => {
  let service: CareersService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(CareersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

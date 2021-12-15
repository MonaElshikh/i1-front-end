import { TestBed } from '@angular/core/testing';

import { CommanFunctionsService } from 'Shared/Services/comman-functions.service';

describe('CommanFunctionsService', () => {
  let service: CommanFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(CommanFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

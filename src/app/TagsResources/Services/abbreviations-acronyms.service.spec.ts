import { TestBed } from '@angular/core/testing';

import { AbbreviationsAcronymsService } from './abbreviations-acronyms.service';

describe('AbbreviationsAcronymsService', () => {
  let service: AbbreviationsAcronymsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(AbbreviationsAcronymsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

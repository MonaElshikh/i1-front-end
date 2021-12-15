import { TestBed } from '@angular/core/testing';

import { ChemistryConnectionngService } from './chemistry-connectionng.service';

describe('ChemistryConnectionngService', () => {
  let service: ChemistryConnectionngService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(ChemistryConnectionngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

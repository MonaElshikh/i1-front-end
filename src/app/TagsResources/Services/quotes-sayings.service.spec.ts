import { TestBed } from '@angular/core/testing';

import { QuotesSayingsService } from './quotes-sayings.service';

describe('QuotesSayingsService', () => {
  let service: QuotesSayingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(QuotesSayingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

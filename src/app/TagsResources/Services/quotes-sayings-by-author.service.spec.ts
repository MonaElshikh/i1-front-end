import { TestBed } from '@angular/core/testing';

import { QuotesSayingsByAuthorService } from './quotes-sayings-by-author.service';

describe('QuotesSayingsByAuthorService', () => {
  let service: QuotesSayingsByAuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(QuotesSayingsByAuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

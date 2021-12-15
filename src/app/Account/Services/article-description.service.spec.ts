import { TestBed } from '@angular/core/testing';

import { ArticleDescriptionService } from './article-description.service';

describe('ArticleDescriptionService', () => {
  let service: ArticleDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(ArticleDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

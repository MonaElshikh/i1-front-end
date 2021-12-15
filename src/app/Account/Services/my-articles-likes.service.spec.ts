import { TestBed } from '@angular/core/testing';

import { MyArticlesLikesService } from './my-articles-likes.service';

describe('MyArticlesLikesService', () => {
  let service: MyArticlesLikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(MyArticlesLikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

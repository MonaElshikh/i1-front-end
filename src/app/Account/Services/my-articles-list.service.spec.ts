import { TestBed } from '@angular/core/testing';

import { MyArticlesListService } from './my-articles-list.service';

describe('MyArticlesListService', () => {
  let service: MyArticlesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(MyArticlesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

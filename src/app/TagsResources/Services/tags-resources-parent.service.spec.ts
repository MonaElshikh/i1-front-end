import { TestBed } from '@angular/core/testing';

import { TagsResourcesParentService } from './tags-resources-parent.service';

describe('TagsResourcesParentService', () => {
  let service: TagsResourcesParentService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(TagsResourcesParentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

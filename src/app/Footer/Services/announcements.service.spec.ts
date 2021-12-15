import { TestBed } from '@angular/core/testing';

import { AnnouncementsService } from './announcements.service';

describe('AnnouncementsService', () => {
  let service: AnnouncementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(AnnouncementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

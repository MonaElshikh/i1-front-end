import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleCommentsComponent } from './admin-article-comments.component';

describe('AdminArticleCommentsComponent', () => {
  let component: AdminArticleCommentsComponent;
  let fixture: ComponentFixture<AdminArticleCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArticleCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticleCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

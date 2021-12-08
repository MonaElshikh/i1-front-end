import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostedArticlesComponent } from './admin-posted-articles.component';

describe('AdminPostedArticlesComponent', () => {
  let component: AdminPostedArticlesComponent;
  let fixture: ComponentFixture<AdminPostedArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPostedArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

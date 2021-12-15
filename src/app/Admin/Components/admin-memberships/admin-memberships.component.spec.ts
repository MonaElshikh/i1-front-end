import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMembershipsComponent } from './admin-memberships.component';

describe('AdminMembershipsComponent', () => {
  let component: AdminMembershipsComponent;
  let fixture: ComponentFixture<AdminMembershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AdminMembershipsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

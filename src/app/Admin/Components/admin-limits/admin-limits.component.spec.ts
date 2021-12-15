import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLimitsComponent } from './admin-limits.component';

describe('AdminLimitsComponent', () => {
  let component: AdminLimitsComponent;
  let fixture: ComponentFixture<AdminLimitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AdminLimitsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

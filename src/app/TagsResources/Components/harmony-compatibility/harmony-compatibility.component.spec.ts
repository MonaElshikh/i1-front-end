import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmonyCompatibilityComponent } from './harmony-compatibility.component';

describe('HarmonyCompatibilityComponent', () => {
  let component: HarmonyCompatibilityComponent;
  let fixture: ComponentFixture<HarmonyCompatibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [HarmonyCompatibilityComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarmonyCompatibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

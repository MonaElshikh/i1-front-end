import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldsComponent } from './custom-fields.component';

describe('CustomFieldsComponent', () => {
  let component: CustomFieldsComponent;
  let fixture: ComponentFixture<CustomFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [CustomFieldsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

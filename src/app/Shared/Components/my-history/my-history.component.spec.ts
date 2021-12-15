import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHistoryComponent } from './my-history.component';

describe('MyHistoryComponent', () => {
  let component: MyHistoryComponent;
  let fixture: ComponentFixture<MyHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [MyHistoryComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

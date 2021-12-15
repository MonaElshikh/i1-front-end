import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortRelationShipComponent } from './short-relation-ship.component';

describe('ShortRelationShipComponent', () => {
  let component: ShortRelationShipComponent;
  let fixture: ComponentFixture<ShortRelationShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ShortRelationShipComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortRelationShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

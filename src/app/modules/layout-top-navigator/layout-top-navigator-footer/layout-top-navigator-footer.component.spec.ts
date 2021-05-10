import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTopNavigatorFooterComponent } from './layout-top-navigator-footer.component';

describe('LayoutTopNavigatorFooterComponent', () => {
  let component: LayoutTopNavigatorFooterComponent;
  let fixture: ComponentFixture<LayoutTopNavigatorFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutTopNavigatorFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTopNavigatorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

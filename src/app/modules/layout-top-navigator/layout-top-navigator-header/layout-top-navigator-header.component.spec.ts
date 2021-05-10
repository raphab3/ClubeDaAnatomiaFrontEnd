import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTopNavigatorHeaderComponent } from './layout-top-navigator-header.component';

describe('LayoutTopNavigatorHeaderComponent', () => {
  let component: LayoutTopNavigatorHeaderComponent;
  let fixture: ComponentFixture<LayoutTopNavigatorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutTopNavigatorHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTopNavigatorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

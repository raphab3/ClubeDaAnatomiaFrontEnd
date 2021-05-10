import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTopNavigatorComponent } from './layout-top-navigator.component';

describe('LayoutTopNavigatorComponent', () => {
  let component: LayoutTopNavigatorComponent;
  let fixture: ComponentFixture<LayoutTopNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutTopNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTopNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoDeServicoComponent } from './termo-de-servico.component';

describe('TermoDeServicoComponent', () => {
  let component: TermoDeServicoComponent;
  let fixture: ComponentFixture<TermoDeServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermoDeServicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoDeServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

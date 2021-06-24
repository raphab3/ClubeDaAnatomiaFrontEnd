import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultCertificateComponent } from './consult-certificate.component';

describe('ConsultCertificateComponent', () => {
  let component: ConsultCertificateComponent;
  let fixture: ComponentFixture<ConsultCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

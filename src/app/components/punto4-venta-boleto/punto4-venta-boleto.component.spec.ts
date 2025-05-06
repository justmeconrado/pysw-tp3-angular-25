import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaBoletoComponent } from './punto4-venta-boleto.component';

describe('VentaBoletoComponent', () => {
  let component: VentaBoletoComponent;
  let fixture: ComponentFixture<VentaBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaBoletoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

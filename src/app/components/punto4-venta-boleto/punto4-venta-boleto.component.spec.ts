import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto4VentaBoletoComponent } from './punto4-venta-boleto.component';

describe('Punto4VentaBoletoComponent', () => {
  let component: Punto4VentaBoletoComponent;
  let fixture: ComponentFixture<Punto4VentaBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto4VentaBoletoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Punto4VentaBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

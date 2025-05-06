import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto4ListaBoletosComponent } from './punto4-lista-boletos.component';

describe('Punto4ListaBoletosComponent', () => {
  let component: Punto4ListaBoletosComponent;
  let fixture: ComponentFixture<Punto4ListaBoletosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto4ListaBoletosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Punto4ListaBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

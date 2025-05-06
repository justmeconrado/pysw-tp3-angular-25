import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBoletosComponent } from './punto4-lista-boletos.component';

describe('ListaBoletosComponent', () => {
  let component: ListaBoletosComponent;
  let fixture: ComponentFixture<ListaBoletosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaBoletosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

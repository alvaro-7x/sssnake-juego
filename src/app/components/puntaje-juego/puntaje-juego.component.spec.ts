import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntajeJuegoComponent } from './puntaje-juego.component';

describe('PuntajeJuegoComponent', () => {
  let component: PuntajeJuegoComponent;
  let fixture: ComponentFixture<PuntajeJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntajeJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntajeJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

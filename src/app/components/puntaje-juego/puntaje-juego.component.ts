import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ComponentesService } from '../../services/componentes.service';
import { DatosInicioJuego, ResolucionJuego } from '../../interfaces/constantes';
import { ImagenesService } from '../../helpers/imagenes.service';
import { JuegoService } from '../../services/juego.service';


@Component({
  selector: 'app-puntaje-juego',
  templateUrl: './puntaje-juego.component.html',
  styleUrls: ['./puntaje-juego.component.css']
})
export class PuntajeJuegoComponent implements OnInit, AfterViewInit {

  width: number = ResolucionJuego.width //450;
  height: number = 50;
  d: number = ResolucionJuego.d //25;

  @ViewChild('myCanvas') myCanvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D | null;
  
  constructor( private juegoService: JuegoService)
  { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void 
  {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');

		if(!this.ctx)
		  return;

		this.juegoService.setCtxDetallesJuego(this.ctx);
	}

}

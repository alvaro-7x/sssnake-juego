import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Acciones, DatosInicioJuego, EstadosJuego, Movimientos, ResolucionJuego } from '../../interfaces/constantes';
import { ComponentesService } from '../../services/componentes.service';
import { GraficosService } from '../../services/graficos.service';
import { JuegoService } from '../../services/juego.service';
import { SnakeService } from '../../services/snake.service';

@Component({
  selector: 'app-pantalla',
  templateUrl: './pantalla.component.html',
  styleUrls: ['./pantalla.component.css']
})
export class PantallaComponent implements OnInit, AfterViewInit, OnDestroy {

  width: number = ResolucionJuego.width //450;
  height: number = ResolucionJuego.height //600;
  d: number = ResolucionJuego.d //25;

  eventosConsola: any;

  @ViewChild('myCanvas') myCanvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D | null;

  constructor(
      private juegoService: JuegoService,
      private componentesService: ComponentesService,
  )
  { }

  ngOnInit(): void 
  {
    this.eventosConsola = this.componentesService.eventoTeclaPrecionada.subscribe( res=>
    {
      if(res>=Movimientos.LEFT && res<=Movimientos.DOWN)
      {
        this.clickCruceta(res);
      }
      else if(res == Acciones.BOTON_A)
      {
        this.clickBtnA();
      }
      else if(res == Acciones.BOTON_B)
      {
        this.clickBtnB();
      }
      else if(res == Acciones.BOTON_START)
      {
        this.clickBtnStar();
      }
      else if(res == Acciones.BOTON_RESET)
      {
        this.clickBtnReset();
      }
    });
  }

  ngAfterViewInit(): void 
  {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');

    if(!this.ctx)
      return;
    
    this.juegoService.iniciar(this.ctx);
  }

  clickCruceta(direccion: number)
  {
    this.juegoService.crucetaClick(direccion);
  }
  
  clickBtnA()
  {
    this.juegoService.btnAClick();
  }
  
  clickBtnB()
  {
    this.juegoService.btnBClick();
  }

  clickBtnStar()
  {
    this.juegoService.btnStarClick();
  }

  clickBtnReset()
  {
    this.juegoService.btnResetClick();
  }


  ngOnDestroy(): void
  {
    this.eventosConsola.unsubscribe();
  }
}
 
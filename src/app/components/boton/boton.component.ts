import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { Acciones, EstadosJuego, Movimientos, ResolucionJuego, MapeoMovimientos } from '../../interfaces/constantes';
import { ComponentesService } from '../../services/componentes.service';
import { Cruceta, Boton, PuntoClick } from '../../interfaces/interfaces-juego';
import { JuegoService } from '../../services/juego.service';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css']
})

export class BotonComponent implements OnInit {

  width: number = ResolucionJuego.width-30;
  height: number = 118;
  distancia: number = 38;

  cruceta: Cruceta = {x:3,y:1,color:'#212529'};
  botonA: Boton = {x: 11, y:2, color:'red', texto:'A',accion:Acciones.BOTON_A};
  botonB: Boton = {x:9, y:3, color:'blue', texto:'B',accion:Acciones.BOTON_B};

  botonStart: Boton = {x:8, y:1, color:'#212529',texto:'Start/Pause',accion:Acciones.BOTON_START};
  botonReset: Boton = {x:6, y:1, color:'#212529',texto:'Reset',accion:Acciones.BOTON_RESET};

  radioBotonAccion = this.distancia - 10;

  @ViewChild('myCanvasBoton') myCanvasBoton!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D | null;

  constructor(
    private componentesService: ComponentesService,
    private juegoService: JuegoService) { }

  ngOnInit(): void 
  { }

  ngAfterViewInit(): void 
  {
    this.ctx = this.myCanvasBoton.nativeElement.getContext('2d');
    if(!this.ctx)
      return;

    this.juegoService.setCtxControlesJuego(this.ctx);

    this.juegoService.dibujarCruceta(this.cruceta.x,this.cruceta.y,this.cruceta.color); // cruceta normal
    this.juegoService.dibujarBotonAccion(this.botonA.x, this.botonA.y, this.botonA.color,this.botonA.texto,this.radioBotonAccion, true);
    this.juegoService.dibujarBotonAccion(this.botonB.x, this.botonB.y, this.botonB.color,this.botonB.texto,this.radioBotonAccion, true);

    this.juegoService.dibujarBotonOpcion(this.botonReset.x,this.botonReset.y,this.botonReset.color, this.botonReset.texto,null);
    this.juegoService.dibujarBotonOpcion(this.botonStart.x,this.botonStart.y,this.botonStart.color, this.botonStart.texto,null);

    // this.dibujarGridTmp();
  }

  dibujarGridTmp()
  {
    let x = 0;
    let y = 0;

    if(!this.ctx)
      return;

    this.ctx.beginPath();
    this.ctx.lineWidth = 0;

    while((x+ this.distancia)<this.width)
    {
      x = x + this.distancia;
      this.ctx.moveTo(x,0);
      this.ctx.lineTo(x,this.height);
    }
    while((y+ this.distancia)<this.height)
    {
      y = y +  this.distancia;
      this.ctx.moveTo(0,y);
      this.ctx.lineTo(this.width,y);
    }
    this.ctx.closePath();

    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent)
  {
    const buscar = this.getMovimientoAccion(event.keyCode);

    if(buscar)
      this.manejarEventosBotones(buscar.movimientoAccion);
  }

  getMovimientoAccion(keyCode: number)
  {
    const buscar = MapeoMovimientos.find( (dato) => {
      if(dato.tecla == keyCode)
        return dato;
      return; //Delete this line
    });

    return (buscar)?buscar:null;
  }

  manejarEventosBotones(movimientoAccion: number)
  {

    if(movimientoAccion <0)
      return;

    let teclaPrecionada = -1;

    switch(movimientoAccion)
    {
      case Movimientos.LEFT:
        this.juegoService.redibujarCruceta(this.cruceta.x,this.cruceta.y,this.cruceta.color,Movimientos.LEFT);
        teclaPrecionada = Movimientos.LEFT;
      break;

      case Movimientos.UP:
        this.juegoService.redibujarCruceta(this.cruceta.x,this.cruceta.y,this.cruceta.color,Movimientos.UP);
        teclaPrecionada = Movimientos.UP;
      break;

      case Movimientos.RIGHT:
        this.juegoService.redibujarCruceta(this.cruceta.x,this.cruceta.y,this.cruceta.color,Movimientos.RIGHT);
        teclaPrecionada = Movimientos.RIGHT;
      break;

      case Movimientos.DOWN:
        this.juegoService.redibujarCruceta(this.cruceta.x,this.cruceta.y,this.cruceta.color,Movimientos.DOWN);
        teclaPrecionada = Movimientos.DOWN;
      break;

      case Acciones.BOTON_A:
        this.juegoService.redibujarBotonAccion(this.botonA.x, this.botonA.y, this.botonA.color,this.botonA.texto);
        teclaPrecionada = Acciones.BOTON_A;
      break;

      case Acciones.BOTON_B:
        this.juegoService.redibujarBotonAccion(this.botonB.x, this.botonB.y, this.botonB.color,this.botonB.texto);
        teclaPrecionada = Acciones.BOTON_B;
      break;

      case Acciones.BOTON_RESET:
        this.juegoService.redibujarBotonOpcion(this.botonReset.x, this.botonReset.y, this.botonReset.color,this.botonReset.texto);
        teclaPrecionada = Acciones.BOTON_RESET;
      break;

      case Acciones.BOTON_START:
        this.juegoService.redibujarBotonOpcion(this.botonStart.x, this.botonStart.y, this.botonStart.color,this.botonStart.texto);
        teclaPrecionada = Acciones.BOTON_START;
      break;
    }

    if(teclaPrecionada > 0)
      this.componentesService.eventoTeclaPrecionada.emit(teclaPrecionada);
  }

  clickEnCanvas(event: MouseEvent)
  {
    const puntoClick = {x:event.offsetX, y: event.offsetY };

    this.clickCruceta(puntoClick, this.cruceta, this.distancia);

    this.clickBotonOpcion(puntoClick, this.botonStart, this.distancia);
    this.clickBotonOpcion(puntoClick, this.botonReset, this.distancia);

    this.clickBotonAccion(puntoClick, this.botonA, this.distancia, this.radioBotonAccion);
    this.clickBotonAccion(puntoClick, this.botonB, this.distancia, this.radioBotonAccion);

  }

  clickCruceta(puntoClick: PuntoClick, cruceta: Cruceta, distancia: number)
  {
    const movimientoAccion = this.juegoService.verificarClickCruceta(puntoClick, cruceta, distancia);

    if(movimientoAccion > 0)
      this.manejarEventosBotones(movimientoAccion);
  }

  clickBotonAccion(puntoClick: PuntoClick,  boton: Boton, distancia:number, radioBotonAccion: number)
  {
    const movimientoAccion = this.juegoService.verificarClickBotonAccion(puntoClick, boton, distancia, radioBotonAccion);

    if(movimientoAccion > 0)
      this.manejarEventosBotones(movimientoAccion);
  }

  clickBotonOpcion(puntoClick: PuntoClick, boton: Boton, distancia: number)
  {
    const movimientoAccion = this.juegoService.verificarClickBotonOpcion(puntoClick, boton, distancia);

    if(movimientoAccion > 0)
      this.manejarEventosBotones(movimientoAccion);
  }



}

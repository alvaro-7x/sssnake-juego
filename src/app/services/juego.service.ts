import { Injectable } from '@angular/core';

import { Boton, Cruceta, PuntoClick } from '../interfaces/interfaces-juego';
import { DatosInicioJuego, EstadosJuego, Movimientos, ResolucionJuego } from '../interfaces/constantes';
import { GraficosService } from './graficos.service';
import { ImagenesService } from '../helpers/imagenes.service';
import { SnakeService } from './snake.service';

@Injectable({
  providedIn: 'root'
})

export class JuegoService
{

	private width: number = ResolucionJuego.width;
	private height: number = ResolucionJuego.height;
	private d: number = ResolucionJuego.d;

	direccionActual: number = Movimientos.LEFT;
	direccion: number =Movimientos.LEFT;
	puedeAtravesarParedes: boolean = DatosInicioJuego.puedeAtravesarParedes;
	score: number = DatosInicioJuego.score;
	scoreMax: number = DatosInicioJuego.scoreMax;
	vidasSss: number = DatosInicioJuego.vidas;
	nivelJuego: number = DatosInicioJuego.nivelJuego;

	nivelJuegoIncrementado: boolean = false;
	itemEspecialMostrado: boolean = false;
	juegoPausado: boolean = false;

	versionOriginal: boolean = DatosInicioJuego.versionOriginal;
	estadoJuegoActual: number = EstadosJuego.INICIANDO;
	velocidadJuego: number = DatosInicioJuego.velocidadJuego;
	velocidadSnake: number = DatosInicioJuego.velocidadSnake;

	x: number = DatosInicioJuego.x;
	y: number = DatosInicioJuego.y;
	vx: number = DatosInicioJuego.vx;
	vy: number = DatosInicioJuego.vy;

	ctx!: CanvasRenderingContext2D | null;
	ctxDetallesJuego!: CanvasRenderingContext2D | null;
	ctxControlesJuego!: CanvasRenderingContext2D | null;

	graficosService = new GraficosService();
	imagenesService = new ImagenesService();

	snakeService = new SnakeService(this,this.imagenesService, this.graficosService);
  constructor() {
  }

	//Getters

	getDireccionActual(){ return this.direccionActual; }
	getPuedeAtravesarParedes(){ return this.puedeAtravesarParedes; }
	getScore(){ return this.score; }
	getScoreMax(){ return this.scoreMax; }
	getVidasSss(){ return this.vidasSss; }
	getNivelJuego(){ return this.nivelJuego; }
	getNivelJuegoIncrementado(){ return this.nivelJuegoIncrementado; }
	getItemEspecialMostrado(){ return this.itemEspecialMostrado; }
	getJuegoPausado(){ return this.juegoPausado; }
	getVersionOriginal(){ return this.versionOriginal; }
	getEstadoJuegoActual(){ return this.estadoJuegoActual; }
	getVelocidadJuego(){ return this.velocidadJuego; }
	getVelocidadSnake(){ return this.velocidadSnake; }

	getX(){ return this.x; }
	getY(){ return this.y; }
	getVx(){ return this.vx; }
	getVy(){ return this.vy; }
	getCtx(){ return this.ctx; }



	//Setters
	setDireccionActual(direccionActual: number){ this.direccionActual = direccionActual; }
	setPuedeAtravesarParedes(puedeAtravesarParedes: boolean){ this.puedeAtravesarParedes = puedeAtravesarParedes; }
	setScore(score: number){ this.score = score; }
	setScoreMax(scoreMax: number){ this.scoreMax = scoreMax; }
	setVidasSss(vidasSss: number){ this.vidasSss = vidasSss; }
	setNivelJuego(nivelJuego: number){ this.nivelJuego = nivelJuego; }
	setNivelJuegoIncrementado(nivelJuegoIncrementado: boolean){ this.nivelJuegoIncrementado = nivelJuegoIncrementado; }
	setItemEspecialMostrado(itemEspecialMostrado: boolean){ this.itemEspecialMostrado = itemEspecialMostrado; }
	setJuegoPausado(juegoPausado: boolean){ this.juegoPausado = juegoPausado; }
	setVersionOriginal(versionOriginal: boolean){ this.versionOriginal = versionOriginal; }
	setEstadoJuegoActual(estadoJuegoActual: number){ this.estadoJuegoActual = estadoJuegoActual; }
	setVelocidadJuego(velocidadJuego: number){ this.velocidadJuego=velocidadJuego; }
	setVelocidadSnake(velocidadSnake: number){ this.velocidadSnake=velocidadSnake; }

	setX(x: number){ this.x = x; }
	setY(y: number){ this.y = y; }
	setVx(vx: number){ this.vx = vx; }
	setVy(vy: number){ this.vy = vy; }
	setCtx(ctx:CanvasRenderingContext2D | null){ this.ctx=ctx; }

	setCtxDetallesJuego(ctx: CanvasRenderingContext2D){this.ctxDetallesJuego = ctx;}
	setCtxControlesJuego(ctx: CanvasRenderingContext2D){this.ctxControlesJuego = ctx;}

	atravesarParedes()
	{
		if(this.x>this.width/this.d)
			this.x=1;

		if(this.x<=0)
			this.x=this.width/this.d;

		if(this.y>this.height/this.d)
			this.y=1;

		if(this.y<=0)
			this.y=this.height/this.d;
	}

	verificarGameOver()
	{
		if(this.estadoJuegoActual == EstadosJuego.CHOQUE)
		{
			this.vidasSss = this.vidasSss<0?0:this.vidasSss;
			if(this.vidasSss > 0)
			{
				this.reiniciarDatos();
				this.estadoJuegoActual = EstadosJuego.CORRIENDO;
			}
			else
			{
				this.estadoJuegoActual = EstadosJuego.FINALIZADO;
			}
		}
	}

	reiniciarDatos()
	{
		this.x = DatosInicioJuego.x,
		this.y = DatosInicioJuego.y,
		this.vx = -DatosInicioJuego.vx,
		this.vy = DatosInicioJuego.vy;
		this.direccionActual = Movimientos.LEFT;
		this.direccion = Movimientos.LEFT;
		this.estadoJuegoActual = EstadosJuego.CORRIENDO;
		this.nivelJuegoIncrementado = DatosInicioJuego.nivelJuegoIncrementado;
		this.snakeService.eliminarComidasSss();
		this.snakeService.setDireccionSss(-1);

		this.snakeService.initSss();
		this.snakeService.primeraComida(3000);
		this.dibujarDetallesJuego();
	}


	mostrarItemEspecial(size:number)
	{
		if(this.snakeService.getSssSize() % size == 0 && this.itemEspecialMostrado == false)
		{
			this.snakeService.addItemSss(5);
			this.itemEspecialMostrado = true;
		}

		if(this.snakeService.getSssSize() % size == 1)
		{
			this.itemEspecialMostrado = false;
		}
	}

	incrementarNivel(size:number)
	{
		if(this.snakeService.getSssSize() % size == 0 && this.nivelJuegoIncrementado == false)
		{
			this.velocidadJuego = this.velocidadJuego - 1;

			if(this.velocidadJuego <= 20)
			{
				this.velocidadJuego = 20;
			}

			this.nivelJuegoIncrementado = true;
			this.nivelJuego = this.nivelJuego+1;
			
			if(this.nivelJuego > 256)
				this.nivelJuego = 0;

			this.dibujarDetallesJuego();
		}

		if(this.snakeService.getSssSize() % size == 1)
		{
			this.nivelJuegoIncrementado = false;
		}
	}

	dibujarMayorScore()
	{
		if(this.score > this.scoreMax)
			this.scoreMax = this.score;
	}

	resetJuego()
	{
		this.score = DatosInicioJuego.score;
		this.vidasSss = DatosInicioJuego.vidas;
		this.nivelJuego = DatosInicioJuego.nivelJuego;
		this.velocidadJuego = DatosInicioJuego.velocidadJuego;
		this.puedeAtravesarParedes = DatosInicioJuego.puedeAtravesarParedes;

		if(this.estadoJuegoActual == EstadosJuego.FINALIZADO)
		{
			this.estadoJuegoActual = EstadosJuego.CORRIENDO;
			this.versionOriginal = false;
			this.loopJuego();
		}
		this.reiniciarDatos();
	}

	crucetaClick(direccion: number)
	{
		if(this.estadoJuegoActual != EstadosJuego.CORRIENDO)
			return;

		this.direccion = direccion;
		
		this.snakeService.setDireccionSss(direccion);
	}

	btnAClick()
	{
		if(this.estadoJuegoActual == EstadosJuego.FINALIZADO)
			return;

		this.versionOriginal = !this.versionOriginal;
	}

	btnBClick()
	{
		if(this.estadoJuegoActual == EstadosJuego.FINALIZADO)
			return;

		this.puedeAtravesarParedes = !this.puedeAtravesarParedes;
	}

	btnStarClick()
	{
		if(this.estadoJuegoActual == EstadosJuego.FINALIZADO)
			return;

		this.juegoPausado = !this.juegoPausado;
		if(this.juegoPausado == true)
		{
			this.estadoJuegoActual = EstadosJuego.PAUSADO;
			this.snakeService.eliminarComidasRestantes();
		}
		else
		{
			this.snakeService.eliminarComidasSss();
			this.estadoJuegoActual = EstadosJuego.CORRIENDO;
			this.snakeService.primeraComida(10);
		}
	}

	btnResetClick()
	{
		this.score = DatosInicioJuego.score;
		this.vidasSss = DatosInicioJuego.vidas;
		this.nivelJuego = DatosInicioJuego.nivelJuego;
		this.velocidadJuego = DatosInicioJuego.velocidadJuego;
		this.puedeAtravesarParedes = DatosInicioJuego.puedeAtravesarParedes;
		if(this.estadoJuegoActual == EstadosJuego.FINALIZADO)
		{
			this.estadoJuegoActual = EstadosJuego.CORRIENDO;
			this.versionOriginal = DatosInicioJuego.versionOriginal;
			this.loopJuego();
		}
		this.reiniciarDatos();
	}

	loopJuego()
	{
		if(this.estadoJuegoActual != EstadosJuego.FINALIZADO)
		{
			requestAnimationFrame(()=>this.dibujarTodo());
			setTimeout(()=>{this.loopJuego()}, this.velocidadJuego);
		}
	}

	dibujarMovimiento()
	{
		if(this.estadoJuegoActual != EstadosJuego.CORRIENDO)
			return;

		if(Math.abs(this.direccionActual - this.direccion) == 2)
			 this.direccion = this.direccionActual;
		else
			this.direccionActual = this.direccion;

		if(this.direccion==Movimientos.UP) //Arriba 
		{
			this.vx = 0;
			this.vy = -this.velocidadSnake;
		}
		if(this.direccion==Movimientos.DOWN) //Abajo
		{
			this.vx = 0;
			this.vy = +this.velocidadSnake;
		}
		if(this.direccion==Movimientos.LEFT) //izquierda
		{
			this.vx = -this.velocidadSnake;
			this.vy = 0;
		}
		if(this.direccion==Movimientos.RIGHT) //derecha
		{
			this.vx = +this.velocidadSnake;
			this.vy = 0;
		}
		
		this.x += this.vx;
		this.y += this.vy;

		if(this.puedeAtravesarParedes == true)
			this.atravesarParedes();

		if(this.verificarColision() == false)
		{
			const sssParte = {x:this.x,y:this.y};
			this.snakeService.popParteSss();
			this.snakeService.unshiftParteSss(sssParte);
		}

	}

	verificarColision()
	{
		let colision = false;
		this.estadoJuegoActual = EstadosJuego.CORRIENDO;

		if(this.x<=0 || this.x>this.width/this.d || this.y<=0 || this.y>this.height/this.d)
			colision = true;

		if(this.snakeService.verificarAutoColisionSss())
			colision = true;

		if(colision)
		{
			this.vidasSss = this.vidasSss -1;
			this.estadoJuegoActual = EstadosJuego.CHOQUE;
			this.dibujarDetallesJuego();
		}

		return colision;
	}

	dibujarTodo()
	{
		if(!this.ctx)
      return;

		this.graficosService.limpiarCanvas(this.ctx);
		
		if(this.versionOriginal == false)
			this.graficosService.dibujarFondo(this.ctx);
		else
			this.graficosService.dibujarGrid(this.ctx);

		this.dibujarMovimiento();
		this.verificarGameOver();

		if(this.estadoJuegoActual == EstadosJuego.FINALIZADO)
		{
			this.snakeService.dibujarSss(this.ctx);
			this.snakeService.dibujarComidaSss(this.ctx);
			this.snakeService.eliminarComidasRestantes();
			this.graficosService.dibujarGameOver(this.ctx);
			this.dibujarMayorScore();
			this.dibujarDetallesJuego();
			return;
		}
		this.snakeService.dibujarSss(this.ctx);
		this.snakeService.dibujarComidaSss(this.ctx);
		
		if(this.estadoJuegoActual == EstadosJuego.PAUSADO)
		{
			this.graficosService.dibujarPausa(this.ctx);
		}
		this.snakeService.sssComio();
		this.incrementarNivel(DatosInicioJuego.sizeSnakeIncrementarNivel);
		this.mostrarItemEspecial(DatosInicioJuego.sizeSnakeMostrarItem);
		this.dibujarDetallesJuego();
	}

	iniciar(ctx: CanvasRenderingContext2D)
	{
		this.ctx = ctx;
		this.snakeService.initSss();
		this.estadoJuegoActual = EstadosJuego.CORRIENDO;
		this.snakeService.primeraComida(3000);
		this.estadoJuegoActual = EstadosJuego.PAUSADO;
		this.dibujarDetallesJuego();

		this.loopJuego();

	}

	/* Funciones para dibujar los detalles del juego como scoreMax, score, vidas y nivel */

	dibujarDetallesJuego()
	{
		const detallesJuego = {
			score: this.score,
			scoreMax: this.scoreMax,
			vidas: this.vidasSss,
			nivelJuego: this.nivelJuego,
			versionOriginal: this.versionOriginal,
		};

		this.graficosService.dibujarDetallesJuego(this.ctxDetallesJuego!, detallesJuego,this.imagenesService.fondoDetalles, this.imagenesService.snakeDetalles, this.versionOriginal);
	}


	/* Funciones para dibujar los controles del juego */

	dibujarCruceta( x: number, y: number, color:string, direccion:number|null = null)
	{
		this.graficosService.dibujarCruceta(this.ctxControlesJuego!, x, y, color, direccion);
	}

	dibujarBotonAccion(puntoX: number, puntoY: number, color:string,texto:string, radio:number, init:boolean=false)
	{
		this.graficosService.dibujarBotonAccion(this.ctxControlesJuego!, puntoX, puntoY, color,texto, radio, init);
	}

	dibujarBotonOpcion(puntoX: number, puntoY: number, color:string,texto:string, presionado:null|boolean=false)
	{
		this.graficosService.dibujarBotonOpcion(this.ctxControlesJuego!, puntoX, puntoY, color,texto, presionado);
	}

	redibujarCruceta(x: number, y:number, color: string, direccion: number)
	{
		this.graficosService.redibujarCruceta(this.ctxControlesJuego!, x, y, color, direccion);
	}

	redibujarBotonAccion(x:number, y:number, color:string, texto: string)
	{
		this.graficosService.redibujarBotonAccion(this.ctxControlesJuego!, x, y, color, texto);
	}

	redibujarBotonOpcion(x:number, y:number, color:string, texto: string)
	{
		this.graficosService.redibujarBotonOpcion(this.ctxControlesJuego!, x, y, color, texto);
	}


	/* Funciones para manejar los eventos de teclado y click de los controles*/

  getDistanciaEntrePuntos(puntoClick: PuntoClick, boton: Boton, distancia: number)
  {
    const puntoXBoton = distancia*(boton.x-1);
    const puntoYBoton = distancia*(boton.y-1);

    // Utilizamos la distancia euclidiana

    const distanciaEnX = Math.pow((puntoXBoton - puntoClick.x),2);
    const distanciaEnY = Math.pow((puntoYBoton - puntoClick.y),2);
    
    const distanciaPuntos = Math.floor(Math.sqrt(distanciaEnX+distanciaEnY));
    
    return distanciaPuntos;
  }

	verificarClickCruceta(puntoClick: PuntoClick, cruceta: Cruceta, distancia: number)
  {
    const puntoX = 1 + Math.floor(puntoClick.x/distancia);
    const puntoY = 1 + Math.floor(puntoClick.y/distancia);

    const puntoCrucetaX = cruceta.x;
    const puntoCrucetaY = cruceta.y;

    let movimientoAccion = -1;

    if(puntoX == puntoCrucetaX && puntoY == puntoCrucetaY)
    {
      movimientoAccion = Movimientos.UP;
    }
    else if(puntoX == puntoCrucetaX && puntoY == puntoCrucetaY+2)
    {
      movimientoAccion = Movimientos.DOWN;
    }
    else if(puntoX == puntoCrucetaX-1 && puntoY == puntoCrucetaY+1)
    {
      movimientoAccion = Movimientos.LEFT;
    }
    else if(puntoX == puntoCrucetaX+1 && puntoY == puntoCrucetaY+1)
    {
      movimientoAccion = Movimientos.RIGHT;
    }

    return movimientoAccion;
  }

  verificarClickBotonAccion(puntoClick: PuntoClick,  boton: Boton, distancia:number, radioBotonAccion: number)
  {
    let movimientoAccion = -1;

    const distanciaPuntoBoton = this.getDistanciaEntrePuntos(puntoClick, boton, distancia);

    if(distanciaPuntoBoton <= radioBotonAccion)
    {
      movimientoAccion = boton.accion;
    }

    return movimientoAccion;
  }

  verificarClickBotonOpcion(puntoClick: PuntoClick, boton: Boton, distancia: number)
  {
    const puntoX = 1 + Math.floor(puntoClick.x/distancia);
    const puntoY = 1 + Math.floor(puntoClick.y/distancia);

    let movimientoAccion = -1;

    if(puntoX == boton.x && puntoY == boton.y )
    {
      movimientoAccion = boton.accion;
    }

    return movimientoAccion;
  }

}

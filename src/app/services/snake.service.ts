// import { Injectable } from '@angular/core';

import { Comida, TrozoSnake } from '../interfaces/interfaces-juego';
import { ComidasTipo, DatosInicioJuego, EstadosJuego, Movimientos, ResolucionJuego } from '../interfaces/constantes';
import { GraficosService } from './graficos.service';
import { ImagenesService } from '../helpers/imagenes.service';
import { JuegoService } from './juego.service';

/*@Injectable({
  providedIn: 'root'
})*/

export class SnakeService
{
	private width: number = ResolucionJuego.width;
	private height: number = ResolucionJuego.height;
	private d: number = ResolucionJuego.d;

	sss: TrozoSnake[] = [];
	comidaSss: Comida[] = [];
	direccionInicialSss: number = -1;
	initComida: number = -1;
	comidasTipo = ComidasTipo;

  constructor(
  	private juegoService: JuegoService,
  	private imagenService: ImagenesService, 
  	private graficosService: GraficosService,
  )
  { }


  getComidaSss()
  {
  	return this.comidaSss;
  }

	setDireccionSss(direccion: number)
	{
		this.direccionInicialSss = direccion;
	}
	
	getDireccionSss()
	{
		return this.direccionInicialSss;
	}

	getSssSize()
	{
		return this.sss.length;
	}

	popParteSss()
	{
		this.sss.pop();
	}

	unshiftParteSss(sssParte: TrozoSnake)
	{
		this.sss.unshift(sssParte);
	}

	initSss()
	{
		this.sss = [];
		let xInit = DatosInicioJuego.x;
		let	yInit = DatosInicioJuego.y;
		
		this.sss.push({
			x: xInit,
			y: yInit,
		});

		this.sss.push({
			x: xInit+1,
			y: yInit,
		});

		this.sss.push({
			x: xInit+2,
			y: yInit,
		});
	}

	primeraComida(tiempo: number)
	{
		this.initComida = setTimeout(()=>{
			this.addComidaSss();
		},tiempo);
	}

	verificarAutoColisionSss(): boolean
	{
		const sssHead = this.sss[0];
		const colision = this.sss.filter( (sssTmp, i) => 
		{
			if(sssTmp.x == sssHead.x && sssTmp.y == sssHead.y)
				return sssTmp
			return; // delete this line
		});
		return colision.length>1 ?true: false;
	}

	verificarColisionComidaSss(x: number, y:number): boolean
	{
		const colision = this.comidaSss.filter( (comida) => 
		{
			if(comida.x == x && comida.y == y)
				return comida;
			return; // delete this line
		});
		return colision.length>0 ?true: false;
	}

	verificarColisionSss(x:number ,y:number): boolean
	{
		const colision = this.sss.filter( (sssTmp) => 
		{
			if(sssTmp.x == x && sssTmp.y == y)
				return sssTmp
			return; // delete this line
		});
		return colision.length>0 ?true: false;
	}

	comioComidaSss(x:number ,y:number): boolean
	{
		const comida = this.comidaSss.find((c)=>
		{
			if(c.x == x && c.y == y )
				return c;
			return; // delete this line
		});

		return comida? true: false;
	}

	addComidaSss()
	{
		const maxValueX = this.width/this.d;
		const maxValueY = this.height/this.d;

		const minValueX = 1;
		const minValueY = 1;

		if(this.juegoService.getEstadoJuegoActual() != EstadosJuego.CORRIENDO)
			return;

		// Math.floor(Math.random() * (max - min + 1)) + min;
		const newX = Math.floor(Math.random() * (maxValueX - minValueX + 1)) + minValueX;
		const newY = Math.floor(Math.random() * (maxValueY - minValueY + 1)) + minValueY;

		if(
				this.verificarColisionComidaSss(newX, newY) == false &&
				this.verificarColisionSss(newX, newY) == false
			)
		{

			const t = 5*1000; // El tiempo de espera sera de 5 seg antes de desaparecer
			
			const tiempoValidezComida = setTimeout(()=>
			{
				this.removeComidaSss(newX,newY);
				this.addComidaSss();
			}, t);

			const tipo = Math.floor(Math.random() * (this.comidasTipo.length-1));
			
			const nuevaComida =
			{
				x: newX,
				y: newY,
				tiempo: tiempoValidezComida,
				tipo: tipo
			};

			this.comidaSss.push(nuevaComida);

			return {newX,newY};
		}
		else
		{
			this.addComidaSss();
			return null;
		}
	}

	addItemSss(tipo: number)
	{
		const maxValueX = this.width/this.d;
		const maxValueY = this.height/this.d;

		const minValueX = 1;
		const minValueY = 1;

		if(this.juegoService.getEstadoJuegoActual() != EstadosJuego.CORRIENDO)
			return;

		// Math.floor(Math.random() * (max - min + 1)) + min;
		const newX = Math.floor(Math.random() * (maxValueX - minValueX + 1)) + minValueX;
		const newY = Math.floor(Math.random() * (maxValueY - minValueY + 1)) + minValueY;

		if(
				this.verificarColisionComidaSss(newX, newY) == false &&
				this.verificarColisionSss(newX, newY) == false
			)
		{

			const t = 7*1000; // El tiempo de espera sera de 7 seg antes de desaparecer
			
			const tiempoValidezComida = setTimeout(()=>{
				this.removeComidaSss(newX,newY);
			}, t);

			const nuevaComida =
			{
				x: newX,
				y: newY,
				tiempo: tiempoValidezComida,
				tipo: tipo-1
			};

			this.comidaSss.push(nuevaComida);

			return {newX,newY};
		}
		else
		{
			this.addItemSss(tipo);
			return null;
		}
	}


	sssComio()
	{
		if( this.comioComidaSss(this.sss[0].x, this.sss[0].y) )
		{
			const comida = this.removeComidaSss(this.sss[0].x, this.sss[0].y);

			if(comida)
			{
				const addScore = this.comidasTipo[comida.tipo].valor;
				
				let score = this.juegoService.getScore();
				score += addScore;
				
				this.juegoService.setScore(score);

				if(score <0)
					this.juegoService.setScore(0);

				if(this.comidasTipo[comida.tipo].especial == false)
					this.addComidaSss();

				if(this.comidasTipo[comida.tipo].tipo =='estrella')
				{
					let tmpVida = this.juegoService.getVidasSss()+1;

					if(tmpVida>99)
						tmpVida= 99;

					this.juegoService.setVidasSss(tmpVida);
				}

				this.juegoService.dibujarDetallesJuego();

				let nuevaParteSss_X = 0;
				let nuevaParteSss_Y = 0;
				let incremento = 0;

				if(this.juegoService.getDireccionActual() == Movimientos.LEFT || this.juegoService.getDireccionActual() == Movimientos.UP)
					incremento = -1;
				else
					incremento = 1;

				if(this.juegoService.getDireccionActual() == Movimientos.LEFT || this.juegoService.getDireccionActual() == Movimientos.RIGHT)
				{
					nuevaParteSss_X = this.juegoService.getX()+incremento;
					nuevaParteSss_Y = this.juegoService.getY();
				}
				else
				{
					nuevaParteSss_X = this.juegoService.getX();
					nuevaParteSss_Y = this.juegoService.getY()+incremento;
				}

				this.sss.push({
					x: nuevaParteSss_X,
					y: nuevaParteSss_Y,
				});
				
			}

		}
	}

	removeComidaSss(x: number, y: number)
	{
		if(this.juegoService.getEstadoJuegoActual() != EstadosJuego.CORRIENDO)
			return;

		let tmpComidaSss = [...this.comidaSss];

		let comida = null;

		for(let i = 0;i<tmpComidaSss.length;i++)
		{
			comida = tmpComidaSss[i];

			if(comida.x == x && comida.y == y)
			{
				tmpComidaSss.splice(i,1);
				break;
			}
		}

		this.comidaSss = [...tmpComidaSss];
		tmpComidaSss = [];

		if(comida)
		{
			clearTimeout(comida.tiempo);
			return comida;
		}
		return null;
	}

	eliminarComidasRestantes()
	{
		let tmpComidaSss = [...this.comidaSss];

		for(let i in tmpComidaSss)
		{
			const comida = tmpComidaSss[i];
			if(comida)
			{
				clearTimeout(comida.tiempo);
			}
		}
		tmpComidaSss = [];
	}

	eliminarComidasSss()
	{
		clearTimeout(this.initComida);
		this.eliminarComidasRestantes();
		this.comidaSss = [];
	}

	dibujarComidaSss(ctx: CanvasRenderingContext2D)
	{
		for(let i in this.comidaSss)
		{
			const comida = this.comidaSss[i];
			const tipo = this.comidasTipo[comida.tipo];

			switch(tipo.tipo)
			{
				case 'cuadrado':
					if(this.juegoService.getVersionOriginal())
						this.graficosService.dibujarPunto(comida.x,comida.y,tipo.color, ctx);
					else
						this.graficosService.dibujarComidaImagen(comida.x, comida.y, this.imagenService.comida1,ctx);
				break;
				case 'circulo':
					if(this.juegoService.getVersionOriginal())
						this.graficosService.dibujarPuntoCircular(comida.x,comida.y,tipo.color, ctx);
					else
						this.graficosService.dibujarComidaImagen(comida.x, comida.y, this.imagenService.comida2,ctx);
				break;
				case 'triangulo-up':
					if(this.juegoService.getVersionOriginal())
						this.graficosService.dibujarPuntoTriangular(comida.x,comida.y,tipo.color, ctx, Movimientos.UP);
					else
						this.graficosService.dibujarComidaImagen(comida.x, comida.y, this.imagenService.comida4,ctx);
				break;
				case 'triangulo-down':
					if(this.juegoService.getVersionOriginal())
						this.graficosService.dibujarPuntoTriangular(comida.x,comida.y,tipo.color, ctx, Movimientos.DOWN);
					else
						this.graficosService.dibujarComidaImagen(comida.x, comida.y, this.imagenService.comida3,ctx);
				break;
				case 'estrella':
					if(this.juegoService.getVersionOriginal())
						this.graficosService.dibujarPuntoEstrella(comida.x,comida.y,tipo.color, ctx);
					else
						this.graficosService.dibujarComidaImagen(comida.x, comida.y, this.imagenService.comida5,ctx);
				break;
				default:
					if(this.juegoService.getVersionOriginal())
						this.graficosService.dibujarPunto(comida.x,comida.y,tipo.color, ctx);
					else
						this.graficosService.dibujarComidaImagen(comida.x, comida.y, this.imagenService.comida1,ctx);
				break
			}
		}
	}

	getSssParteSiguiente(i: number)
	{
		return (i>=0)? this.sss[i]:null;
	}

	dibujarSss(ctx: CanvasRenderingContext2D)
	{
		const sssTmp = [...this.sss];
		let sssDireccion;
		let direccionHistorial = {};
		for (let i = sssTmp.length - 1; i >= 0; i--)
		{
			const sssParte = sssTmp[i];
			let color;
			let tipo;
			sssDireccion = this.juegoService.getDireccionActual();
			direccionHistorial = {};
			if(this.juegoService.getVersionOriginal() == true)
			{
				color = (i == 0)? (this.juegoService.getPuedeAtravesarParedes() == true?'white':'#212529'):'#212529';
				this.graficosService.dibujarPunto(sssParte.x,sssParte.y, color, ctx);
			}
			else
			{
				if(i == sssTmp.length-1)
				{
					tipo = 'cola';
				}
				else if(i == 0)
				{
					tipo = 'cabeza';
				}
				else if(i == 1)
				{
					tipo = 'cuerpo1';
				}
				else
				{
					tipo = 'cuerpo';
				}

				const sssParteSiguiente = this.getSssParteSiguiente(i-1);

				if(sssParteSiguiente)
				{
					if(sssParte.x == 1 && sssParteSiguiente.x == this.width/this.d)
					{
						sssDireccion = Movimientos.LEFT;
					}
					else if(sssParte.x == this.width/this.d && sssParteSiguiente.x == 1)
					{
						sssDireccion = Movimientos.RIGHT;
					}
					else if(sssParte.x > sssParteSiguiente.x)
					{
						sssDireccion = Movimientos.LEFT;
					}
					else if(sssParte.x < sssParteSiguiente.x)
					{
						sssDireccion = Movimientos.RIGHT;
					}

					if(sssParte.y == 1 && sssParteSiguiente.y == this.height/this.d)
					{
						sssDireccion = Movimientos.UP;
					}
					else if(sssParte.y == this.height/this.d && sssParteSiguiente.y == 1)
					{
						sssDireccion = Movimientos.DOWN;
					}
					else if(sssParte.y > sssParteSiguiente.y)
					{
						sssDireccion = Movimientos.UP;
					}
					else if(sssParte.y < sssParteSiguiente.y)
					{
						sssDireccion = Movimientos.DOWN;
					}

					// direccionHistorial nos servira para determnar si la snake dio un giro
					direccionHistorial =
					{
						anterior:this.direccionInicialSss,
						actual: sssDireccion
					}

					if(sssDireccion != this.direccionInicialSss)
					{
						this.direccionInicialSss = sssDireccion;
					}
				}

				const snakeAll = this.imagenService.snakeAll;
				this.graficosService.dibujarSssImagen(sssParte.x, sssParte.y, snakeAll, ctx, tipo,sssDireccion,this.juegoService.getPuedeAtravesarParedes(),direccionHistorial);
			}

		}
	}


}

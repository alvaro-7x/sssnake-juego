// import { Injectable } from '@angular/core';
import { DireccionHistorial, DetallesJuego, DatoDetalleJuego } from '../interfaces/interfaces-juego';
import { ImagenesService } from '../helpers/imagenes.service';
import { Movimientos, ResolucionJuego, TextoAyuda } from '../interfaces/constantes';

/*@Injectable({
  providedIn: 'root'
})*/

export class GraficosService {

	private width: number = ResolucionJuego.width;
	private height: number = ResolucionJuego.height;
	private heightDetalles: number = 50;
	private d: number = ResolucionJuego.d;
	private distancia: number = 38;
	private colorDefault: string = 'black';

	imagenesService = new ImagenesService();

  constructor()
  { }

	limpiarCanvas(ctx: CanvasRenderingContext2D)
	{
		ctx.lineWidth = 1;
		ctx.clearRect(0,0,this.width,this.height);
	}

	dibujarFondo(ctx: CanvasRenderingContext2D)
	{
		ctx.beginPath();
		ctx.drawImage(this.imagenesService.fondo, 0, 0);
		ctx.closePath();
	}

	dibujarGrid(ctx: CanvasRenderingContext2D)
	{
		let x = 0;
		let y = 0;

		ctx.fillStyle = 'grey';
		ctx.fillRect(0, 0, this.width, this.height);
		
		ctx.beginPath();
		while((x+this.d)< this.width)
		{
			x = x + this.d;
			ctx.moveTo(x,0);
			ctx.lineTo(x,this.height);
		}
		while((y+ this.d)< this.height)
		{
			y = y + this.d;
			ctx.moveTo(0,y);
			ctx.lineTo(this.width,y);
		}
		ctx.closePath();

		ctx.strokeStyle = "black";
		ctx.stroke();
	}

	dibujarGameOver(ctx: CanvasRenderingContext2D)
	{
		const newPuntoX = this.width/2;
		const newPuntoY = this.height/2;

		const ancho = this.width /2;
		const alto = this.height /4;

		let fontSize = 70;
		const texto = 'Game Over';

		ctx.beginPath();
		ctx.font = `${fontSize}px Ubuntu`;
		ctx.fillStyle = 'black';
		ctx.strokeStyle = 'black';
		ctx.textAlign = "center";

		let snake = this.imagenesService.snake;
		ctx.drawImage(snake, newPuntoX-snake.width/2, newPuntoY-ancho/2);
		ctx.fillText(texto, newPuntoX+3, newPuntoY-3);

		ctx.fillStyle = '#fef7db';
		ctx.fillText(texto, newPuntoX, newPuntoY);

		ctx.closePath();
	}

	dibujarPausa(ctx: CanvasRenderingContext2D)
	{
		const newPuntoX = this.width/2;
		const newPuntoY = this.height/3;

		const ancho = this.width /2;
		const alto = this.height /4;

		let fontSize = 70;
		const texto = 'Pausa';

		ctx.beginPath();
		ctx.font = `${fontSize}px Ubuntu`;
		ctx.textAlign = "center";
		
		ctx.fillStyle = 'black';
		ctx.strokeStyle = 'black';
		ctx.fillText(texto, newPuntoX+3, newPuntoY-3-15);

		ctx.fillStyle = '#fef7db';
		ctx.fillText(texto, newPuntoX, newPuntoY-15);

		const newPuntoX2 = this.width/6;
		const newPuntoY2 = this.height/6;

		const ancho2 = newPuntoX2*4;
		const alto2 = newPuntoY2*2;

		ctx.fillStyle = '#fef7db';
		ctx.drawImage(this.imagenesService.ayuda, newPuntoX2,newPuntoY2+alto2/2,ancho2,alto2+alto2/2);

		ctx.fillStyle = 'black';
		ctx.font = `15px Ubuntu`;
		ctx.textAlign = "left";

		for(let i=0;i<TextoAyuda.length; i++)
		{
			const espacioTexto = 150+(20*i)+(i*3);
			ctx.fillStyle = "#212529";
			ctx.fillText(TextoAyuda[i], newPuntoX2+25, newPuntoY-(alto/2)+espacioTexto);
		}

		ctx.closePath();
	}

	dibujarPunto(puntoX:number, puntoY:number, color:string, ctx: CanvasRenderingContext2D)
	{
		const newPuntoX = this.d*(puntoX-1);
		const newPuntoY = this.d*(puntoY-1);

		ctx.fillStyle =  color;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.fillRect(newPuntoX, newPuntoY, this.d, this.d);
		ctx.strokeRect(newPuntoX, newPuntoY, this.d, this.d);
		ctx.closePath();
	}

	dibujarPuntoCircular(puntoX:number, puntoY:number, color:string, ctx: CanvasRenderingContext2D)
	{
		const newPuntoX = this.d*(puntoX-1);
		const newPuntoY = this.d*(puntoY-1);

		ctx.fillStyle =  color;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.arc((newPuntoX+this.d/2), (newPuntoY+this.d/2), this.d/2, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	dibujarPuntoTriangular(puntoX:number, puntoY:number, color:string, ctx: CanvasRenderingContext2D, direccion:number)
	{
		const newPuntoX = this.d*(puntoX-1);
		const newPuntoY = this.d*(puntoY-1);

		ctx.fillStyle =  color;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		switch(direccion)
		{
			case Movimientos.UP:
				// triangulo hacia arriba
				ctx.moveTo(newPuntoX + this.d, newPuntoY+ this.d);
				ctx.lineTo(newPuntoX, newPuntoY + this.d);
				ctx.lineTo(newPuntoX+(this.d/2) , newPuntoY);
			break;
			
			case Movimientos.DOWN:
				// triangulo hacia abajo
				ctx.moveTo(newPuntoX, newPuntoY);
				ctx.lineTo(newPuntoX+this.d, newPuntoY);
				ctx.lineTo(newPuntoX+(this.d/2), newPuntoY+this.d);
			break;

			case Movimientos.LEFT:
				// triangulo hacia la izquierda
				ctx.moveTo(newPuntoX + this.d, newPuntoY + this.d);
				ctx.lineTo(newPuntoX + this.d, newPuntoY);
				ctx.lineTo(newPuntoX , newPuntoY+(this.d/2));
			break;

			case Movimientos.RIGHT:
				// triangulo hacia la derecha
				ctx.moveTo(newPuntoX, newPuntoY);
				ctx.lineTo(newPuntoX, newPuntoY+this.d);
				ctx.lineTo(newPuntoX+this.d, newPuntoY+(this.d/2));
			break;
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	dibujarPuntoEstrella(puntoX:number, puntoY:number, color:string, ctx: CanvasRenderingContext2D)
	{
		const newPuntoX = this.d*(puntoX-1);
		const newPuntoY = this.d*(puntoY-1);

		ctx.beginPath();
		// triangulo hacia abajo
		ctx.moveTo(newPuntoX, newPuntoY+5);
		ctx.lineTo(newPuntoX+this.d, newPuntoY+5);
		ctx.lineTo(newPuntoX+(this.d/2), newPuntoY+this.d);

		// triangulo hacia arriba
		ctx.moveTo(newPuntoX + this.d, newPuntoY+this.d - 5);
		ctx.lineTo(newPuntoX, newPuntoY + this.d - 5);
		ctx.lineTo(newPuntoX+(this.d/2), newPuntoY);
		ctx.closePath();

		ctx.strokeStyle = 'black';
		ctx.fillStyle =  color;
		ctx.stroke();
		ctx.fill();
	}

	dibujarComidaImagen(puntoX:number, puntoY:number, comida:HTMLImageElement, ctx:CanvasRenderingContext2D)
	{
		const newPuntoX = this.d*(puntoX-1);
		const newPuntoY = this.d*(puntoY-1);

		ctx.drawImage(comida, newPuntoX, newPuntoY, this.d, this.d);
	}

	dibujarSssImagen(puntoX:number, puntoY:number, sssImg:HTMLImageElement, ctx:CanvasRenderingContext2D, tipo:string, direccionActual1:number, puedeAtravesarParedes:boolean, direccionHistorial: DireccionHistorial)
	{

		// En esta funcion se utiliza multiplos de 50, por que la imagen snake-all.png esta compuesta por imagenes de 50*50

		const newPuntoX = this.d*(puntoX-1);
		const newPuntoY = this.d*(puntoY-1);
		
		const dw = sssImg.width;
		const dh = sssImg.height;

		let sx = -1,
			sy = -1,
			sWidth,
			sHeight,
			dx,
			dy,
			dWidth,
			dHeight;

		if(tipo == 'cabeza')
		{
			if(puedeAtravesarParedes == true)
				sy = 0;
			else
				sy = 50;

			switch(direccionActual1)
			{
				case Movimientos.LEFT:
					sx = 0;
				break;
				case Movimientos.UP:
					sx = 50;
				break;
				case Movimientos.RIGHT:
					sx = 100;
				break;
				case Movimientos.DOWN:
					sx = 150;
				break;
			}
		}
		else if(tipo == 'cuerpo1')
		{
			switch(direccionActual1)
			{
				case Movimientos.LEFT:
					sx = 0;
					sy = 100;
				break;
				case Movimientos.UP:
					sx = 100;
					sy = 100;
				break;
				case Movimientos.RIGHT:
					sx = 50;
					sy = 150;
				break;
				case Movimientos.DOWN:
					sx = 150;
					sy = 150;
				break;
			}

			const giroSss = this.verificarGiroSss(direccionHistorial);
			
			if(giroSss)
			{
				sx = giroSss?.sx;
				sy = giroSss?.sy;
			}
		}
		else if(tipo == 'cuerpo')
		{
			switch(direccionActual1)
			{
				case Movimientos.LEFT:
					sx = 50;
					sy = 100;
				break;
				case Movimientos.UP:
					sx = 100;
					sy = 150;
				break;
				case Movimientos.RIGHT:
					sx = 0;
					sy = 150;
				break;
				case Movimientos.DOWN:
					sx = 150;
					sy = 100;
				break;
			}
			const giroSss = this.verificarGiroSss(direccionHistorial);
			
			if(giroSss)
			{
				sx = giroSss.sx;
				sy = giroSss.sy;
			}
		}
		else if(tipo == 'cola')
		{
			sy = 200;
			switch(direccionActual1)
			{
				case Movimientos.LEFT:
					sx = 100;
				break;
				case Movimientos.UP:
					sx = 150;
				break;
				case Movimientos.RIGHT:
					sx = 0;
				break;
				case Movimientos.DOWN:
					sx = 50;
				break;
			}
		}

		//sx = 0, 
		//sy = 0, 
		sWidth = 50, 
		sHeight = 50,

		dx = newPuntoX, 
		dy = newPuntoY, 
		dWidth = this.d, 
		dHeight = this.d;

		if(sx != -1 && sy != -1)
			ctx.drawImage(sssImg, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}

	verificarGiroSss(direccionHistorial: DireccionHistorial)
	{
		// En esta funcion se utiliza multiplos de 50, por que la imagen snake-all.png esta compuesta por imagenes de 50*50
		
		let sx, sy;
		if(	Object.keys(direccionHistorial).length == 2 &&
				(direccionHistorial.anterior! !== direccionHistorial.actual! && Math.abs(direccionHistorial.anterior! - direccionHistorial.actual!)!=2 )
		  )
		{
				sy=250;
				sx=-1;
				if(
					(direccionHistorial.anterior == Movimientos.UP &&
					 direccionHistorial.actual == Movimientos.LEFT)
					||
					(direccionHistorial.anterior == Movimientos.RIGHT &&
					direccionHistorial.actual == Movimientos.DOWN)
					)
				{
					sx = 0;
				}

				if(
					(direccionHistorial.anterior == Movimientos.UP &&
					direccionHistorial.actual == Movimientos.RIGHT)
					||
					(direccionHistorial.anterior == Movimientos.LEFT &&
					direccionHistorial.actual == Movimientos.DOWN)
					)
				{
					sx = 50;
				}

				if(
					(direccionHistorial.anterior == Movimientos.LEFT &&
					 direccionHistorial.actual == Movimientos.UP)
					|| 
					(direccionHistorial.anterior == Movimientos.DOWN &&
					direccionHistorial.actual == Movimientos.RIGHT)
				)
				{
					sx = 100;
				}
				if(
					(direccionHistorial.anterior == Movimientos.DOWN &&
					direccionHistorial.actual == Movimientos.LEFT)
					||
					(direccionHistorial.anterior == Movimientos.RIGHT &&
					direccionHistorial.actual == Movimientos.UP)
					)
				{
					sx = 150;
				}
				if(sx>=0 && sy>=0)
					return {sx,sy};
				else
					return null;
		}
		return null;
	}

/************Funciones para el puntaje, vidas y nivel *************/

	dibujarDetallesJuego(ctx: CanvasRenderingContext2D, detallesJuego: DetallesJuego, fondoDetalles: HTMLImageElement, snakeDetalles: HTMLImageElement, versionOriginal:boolean)
	{
    if(versionOriginal == false)
			this.dibujarFondoDetalles(ctx, fondoDetalles);
		else
			this.dibujarGridDetalles(ctx);
		
		this.dibujarScoreMax(ctx, detallesJuego.scoreMax);
		this.dibujarScore(ctx, detallesJuego.score);
		this.dibujarNivel(ctx, detallesJuego.nivelJuego);
		this.dibujarVidas(ctx, snakeDetalles, detallesJuego.vidas);
	}

	dibujarGridDetalles(ctx: CanvasRenderingContext2D)
	{
		let x = 0;
		let y = 0;

		ctx.fillStyle = 'grey';
		ctx.fillRect(0, 0, this.width, this.heightDetalles);
		
		ctx.beginPath();
		while((x+this.d)< this.width)
		{
			x = x + this.d;
			ctx.moveTo(x,0);
			ctx.lineTo(x,this.heightDetalles);
		}
		while((y+ this.d)<= this.heightDetalles)
		{
			y = y + this.d;
			ctx.moveTo(0,y);
			ctx.lineTo(this.width,y);
		}
		ctx.closePath();

		ctx.strokeStyle = "black";
		ctx.stroke();
	}

	dibujarTextoDetalles(ctx: CanvasRenderingContext2D, puntoX: number, puntoY: number, datoJuego: DatoDetalleJuego)
	{
		const newPuntoX = 150*(puntoX-1);
		const newPuntoY = this.d*(puntoY-1);

		ctx.font = `bold ${25}px Ubuntu`;
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';

		const texto = datoJuego.texto;
		const dato = datoJuego.dato;
		const longPadStart = datoJuego.longPadStart;
		const offsetX = datoJuego.offsetX;
		const longMaxTexto = datoJuego.longMaxTexto;

		let tmpDato = String(dato).padStart(longPadStart, '0');

		ctx.beginPath();
		ctx.fillText(`${texto}${tmpDato}`,newPuntoX+offsetX,newPuntoY+this.d-3,longMaxTexto);
		ctx.closePath();
	}

	dibujarScoreMax(ctx: CanvasRenderingContext2D, scoreMax:number)
	{
		const puntoX=2;
		const puntoY=1;
		const datoJuego = {
			texto:'Top-',
			dato:scoreMax,
			longPadStart:7,
			offsetX:75,
			longMaxTexto:this.width,
		}
		this.dibujarTextoDetalles(ctx, puntoX, puntoY, datoJuego);
	}

	dibujarScore(ctx: CanvasRenderingContext2D, score: number)
	{
		const puntoX=1;
		const puntoY=2;

		const datoJuego = {
			texto:'Tú-',
			dato:score,
			longPadStart:7,
			offsetX:75,
			longMaxTexto:150,
		}
		this.dibujarTextoDetalles(ctx, puntoX, puntoY, datoJuego);
	}

	dibujarNivel(ctx: CanvasRenderingContext2D,  nivelJuego: number)
	{
		const puntoX=3;
		const puntoY=2;

		const datoJuego = {
			texto:'Nivel-',
			dato:nivelJuego,
			longPadStart:3,
			offsetX:75,
			longMaxTexto:150,
		}
		this.dibujarTextoDetalles(ctx, puntoX, puntoY, datoJuego);
	}

	dibujarVidas(ctx: CanvasRenderingContext2D, snakeDetalles: HTMLImageElement, vidas:number)
	{
		const puntoX=2;
		const puntoY=2;

		const newPuntoX = 150*(puntoX-1);
		const newPuntoY = this.d*(puntoY-1);

		let sx = 0;
		let sy = 0; 
		let sWidth = snakeDetalles.width;
		let sHeight = snakeDetalles.height;

		let dx = newPuntoX;
		let dy = newPuntoY; 
		let dWidth = 150; 
		let dHeight = this.d;

		ctx.beginPath();
		ctx.drawImage(snakeDetalles, sx, sy, sWidth, sHeight, dx+3, dy-3, dWidth, dHeight);
		ctx.closePath();

		const datoJuego = {
			texto:'',
			dato:vidas,
			longPadStart:2,
			offsetX:125,
			longMaxTexto:50,
		}

		this.dibujarTextoDetalles(ctx, puntoX, puntoY, datoJuego);
	}

	dibujarFondoDetalles(ctx: CanvasRenderingContext2D, fondoDetalles: HTMLImageElement)
	{
		ctx.beginPath();
		ctx.drawImage(fondoDetalles, 0, 0,this.width,this.heightDetalles);
		ctx.closePath();
	}


	/* Funciones para los controles cruceta y botones de accion*/

  redibujarCruceta(ctx:CanvasRenderingContext2D, x: number, y:number, color: string, direccion: number)
  {
      this.dibujarCruceta(ctx, x,y,color, direccion);

      setTimeout(() => {
        
        this.dibujarCruceta(ctx, x,y,color);

      },700);
  }

  redibujarBotonAccion(ctx:CanvasRenderingContext2D, x:number, y:number, color:string, texto: string)
  {
    this.dibujarBotonAccion(ctx, x, y, this.colorDefault,texto,this.distancia - 10);
    this.dibujarBotonAccion(ctx, x, y, color,texto,this.distancia - 11.5,true);

    setTimeout(()=>{

      this.dibujarBotonAccion(ctx, x, y, color,texto,this.distancia - 10,true);

    },700);
  }

  redibujarBotonOpcion(ctx: CanvasRenderingContext2D ,x:number, y:number, color:string, texto: string)
  {

    this.dibujarBotonOpcion(ctx, x,y,color,texto,true);

    setTimeout(()=>{

       this.dibujarBotonOpcion(ctx, x,y,color,texto,false);

    },700);
  }

  dibujarCruceta(ctx: CanvasRenderingContext2D, x: number, y: number, color:string, direccion:number|null = null)
  {

    this.dibujarCrucetaSombra(ctx, x, y,'#212529');

    this.dibujarPuntoControles(ctx, x,y, color);
    this.dibujarPuntoControles(ctx, x,y+1, color,true);
    this.dibujarPuntoControles(ctx, x,y+2, color);

    this.dibujarPuntoControles(ctx, x-1,y+1, color);
    this.dibujarPuntoControles(ctx, x,y+1, color,true);
    this.dibujarPuntoControles(ctx, x+1,y+1, color);


    this.dibujarPuntoTriangularControles(ctx, x,y,'grey',Movimientos.UP,9, direccion == Movimientos.UP);
    this.dibujarPuntoTriangularControles(ctx, x,y+2,'grey',Movimientos.DOWN,9, direccion == Movimientos.DOWN);

    this.dibujarPuntoCircularControles(ctx, x,y+1,'#32383e',true);

    this.dibujarPuntoTriangularControles(ctx, x-1,y+1,'grey',Movimientos.LEFT,9, direccion == Movimientos.LEFT);
    this.dibujarPuntoTriangularControles(ctx, x+1,y+1,'grey',Movimientos.RIGHT,9, direccion == Movimientos.RIGHT);
  }

  dibujarCrucetaSombra(ctx: CanvasRenderingContext2D, x: number, y: number, color:string)
  {
    this.dibujarPuntoSombra(ctx, x,y, color);
    this.dibujarPuntoSombra(ctx, x,y+1, color);
    this.dibujarPuntoSombra(ctx, x,y+2, color);

    this.dibujarPuntoSombra(ctx, x-1,y+1, color);
    this.dibujarPuntoSombra(ctx, x,y+1, color);
    this.dibujarPuntoSombra(ctx, x+1,y+1, color);
   }

  dibujarPuntoControles(ctx: CanvasRenderingContext2D, puntoX: number, puntoY: number, color: string, colorNormal:boolean=false)
  {
    const newPuntoX = (this.distancia*(puntoX-1));
    const newPuntoY = (this.distancia*(puntoY-1));

    if(!ctx)
      return;

    const radio = this.distancia;
    let grd = ctx.createLinearGradient(newPuntoX-25, newPuntoY-25,newPuntoX+10, newPuntoY+10);
    grd.addColorStop(0.1, "white");
    grd.addColorStop(0.5, "#212529");
    grd.addColorStop(0.7, "grey");
    grd.addColorStop(1, color);

    ctx.lineWidth = 0;
    ctx.fillStyle =  colorNormal == false? grd:color;
    ctx.fillRect(newPuntoX, newPuntoY, this.distancia, this.distancia);
  }

  dibujarPuntoSombra(ctx: CanvasRenderingContext2D, puntoX: number, puntoY: number, color: string)
  {
    let incremento = 5;
    let newPuntoX = 0;
    let newPuntoY = 0;

    if(!ctx)
      return;

    ctx.lineWidth = 0;
    ctx.fillStyle =  color;

    while(incremento>=0)
    {
      newPuntoX = ((this.distancia*(puntoX-1)) + (-incremento));
      newPuntoY = ((this.distancia*(puntoY-1)) + (incremento));
      ctx.fillRect(newPuntoX, newPuntoY, this.distancia, this.distancia);
      incremento--;
    }
  }

  dibujarPuntoCircularControles(ctx: CanvasRenderingContext2D, puntoX: number, puntoY: number, color:string, gradiente:boolean= false)
  {
      const newPuntoX = (this.distancia*(puntoX-1));
      const newPuntoY = (this.distancia*(puntoY-1));

      if(!ctx)
        return;

      const radio = 50;
      let grd = ctx.createRadialGradient(newPuntoX+(this.distancia/2),newPuntoY+(this.distancia/2),radio, newPuntoX-(this.distancia/2)-7,newPuntoY-(this.distancia/2)-7,radio);
      grd.addColorStop(0.3, "black");
      grd.addColorStop(0.7, "#212529");
      grd.addColorStop(1, color);

      ctx.beginPath();
      ctx.lineWidth = 0;
      ctx.fillStyle =  (gradiente)?grd:color;
      ctx.arc(newPuntoX+(this.distancia/2), newPuntoY+(this.distancia/2), this.distancia/2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
  }

  dibujarBotonAccion(ctx: CanvasRenderingContext2D, puntoX: number, puntoY: number, color:string,texto:string, radio:number, init:boolean=false)
  {
    const newPuntoX = (this.distancia*(puntoX-1));
    const newPuntoY = (this.distancia*(puntoY-1));

    if(!ctx)
      return;

    let grd = ctx.createRadialGradient(newPuntoX,newPuntoY,radio, newPuntoX,newPuntoY-7,radio);
    grd.addColorStop(0.5, "#212529");
    grd.addColorStop(1, color);

    ctx.lineWidth = 0;
    ctx.fillStyle =  grd;
    ctx.beginPath();
    ctx.arc(newPuntoX, newPuntoY,radio, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    if(init == true)
      this.dibujarTextoControles(ctx, puntoX, puntoY, 'white',texto);
  }

  dibujarBotonOpcion(ctx:CanvasRenderingContext2D, puntoX: number, puntoY: number, color:string,texto:string, presionado:null|boolean=false)
  {
    if(presionado == true)
      this.dibujarBotonOpcionBorde(ctx, puntoX, puntoY, 'black',4);
    else
      this.dibujarBotonOpcionBorde(ctx, puntoX, puntoY, '#212529',4);

    let newPuntoX = (this.distancia*(puntoX-1));
    let newPuntoY = (this.distancia*(puntoY-1));

    if(!ctx)
      return;

    const radio = this.distancia;
    let grd = ctx.createLinearGradient(newPuntoX-25, newPuntoY-25,newPuntoX+10, newPuntoY+10);
    grd.addColorStop(0.1, "white");
    grd.addColorStop(0.5, "#212529");
    grd.addColorStop(0.7, "grey");
    grd.addColorStop(1, color);

    ctx.lineWidth = 0;
    ctx.fillStyle =  grd;
    ctx.beginPath();
    ctx.fillRect(newPuntoX, newPuntoY , this.distancia, (this.distancia/2));
    ctx.closePath();

    if(presionado==null)
      this.dibujarTextoControles(ctx, puntoX+0.5,puntoY+0.6,'white',texto,11);
  }

  dibujarBotonOpcionBorde(ctx: CanvasRenderingContext2D, puntoX: number, puntoY: number, color:string, borde:number)
  {
    let newPuntoX = (this.distancia*(puntoX-1));
    let newPuntoY = (this.distancia*(puntoY-1));

    if(!ctx)
      return;

    const radio = this.distancia;
    let grd = ctx.createLinearGradient(newPuntoX-25, newPuntoY-25,newPuntoX+10, newPuntoY+10);
    grd.addColorStop(0.1, "white");
    grd.addColorStop(0.5, "#212529");
    grd.addColorStop(0.7, "grey");
    grd.addColorStop(1, color);

    ctx.lineWidth = borde;
    ctx.fillStyle =  color;
    ctx.strokeStyle =  color;

    ctx.beginPath();
    ctx.strokeRect(newPuntoX, newPuntoY , this.distancia, (this.distancia/2));
    ctx.closePath();
  }

  dibujarTextoControles(ctx: CanvasRenderingContext2D, puntoX: number, puntoY: number, color:string,texto:string, size:number|null=null)
  {

    const newPuntoX = (this.distancia*(puntoX-1));
    const newPuntoY = (this.distancia*(puntoY-1));

    if(!ctx)
      return;

    let fontSize = size?size:this.distancia;

    ctx.beginPath();
    ctx.font = `${fontSize}px Arial`;
    ctx.lineWidth = 1;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(texto, newPuntoX, newPuntoY+10, this.distancia*1.5);
    ctx.closePath();
  }

  dibujarPuntoTriangularControles(ctx: CanvasRenderingContext2D, puntoX: number, puntoY: number, color: string,direccion: number ,porcentaje: number = 0, relleno=false)
  {
    const newPuntoX = (this.distancia*(puntoX-1));
    const newPuntoY = (this.distancia*(puntoY-1));

    if(!ctx)
      return;

    ctx.beginPath();

    switch(direccion)
    {
      case Movimientos.UP:
        // triangulo hacia arriba
        ctx.moveTo(newPuntoX + this.distancia -porcentaje, newPuntoY+ this.distancia - porcentaje);
        ctx.lineTo(newPuntoX + porcentaje, newPuntoY + this.distancia - porcentaje);
        ctx.lineTo(newPuntoX+(this.distancia/2) , newPuntoY + porcentaje);
      break;
      
      case Movimientos.DOWN:
        // triangulo hacia abajo
        ctx.moveTo(newPuntoX +porcentaje, newPuntoY +porcentaje);
        ctx.lineTo(newPuntoX+this.distancia - porcentaje, newPuntoY +porcentaje);
        ctx.lineTo(newPuntoX+(this.distancia/2), newPuntoY+this.distancia - porcentaje);
      break;

      case Movimientos.LEFT:
        // triangulo hacia la izquierda
        ctx.moveTo(newPuntoX + this.distancia - porcentaje, newPuntoY + this.distancia - porcentaje);
        ctx.lineTo(newPuntoX + this.distancia - porcentaje, newPuntoY + porcentaje);
        ctx.lineTo(newPuntoX + porcentaje, newPuntoY+(this.distancia/2));
      break;

      case Movimientos.RIGHT:
        // triangulo hacia la derecha
        ctx.moveTo(newPuntoX + porcentaje, newPuntoY + porcentaje);
        ctx.lineTo(newPuntoX + porcentaje, newPuntoY+this.distancia - porcentaje);
        ctx.lineTo(newPuntoX+this.distancia - porcentaje, newPuntoY+(this.distancia/2));
      break;
    }
    ctx.closePath();

    ctx.lineWidth = 1;
    ctx.fillStyle =  color;
    ctx.strokeStyle =  '#212529';

    if(relleno == true)
      ctx.fill();
    else
      ctx.stroke();
  }


}

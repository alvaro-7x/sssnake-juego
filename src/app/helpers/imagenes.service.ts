// import {  Injectable} from '@angular/core';

/*@Injectable({
  providedIn: 'root'
})
*/
export class ImagenesService 
{
	ayuda!: HTMLImageElement;
	fondo!: HTMLImageElement;
	snake!: HTMLImageElement;

	fondoDetalles!: HTMLImageElement;

	snakeDetalles!: HTMLImageElement;
	snakeAll!: HTMLImageElement;
	comida1!: HTMLImageElement;
	comida2!: HTMLImageElement;
	comida3!: HTMLImageElement;
	comida4!: HTMLImageElement;
	comida5!: HTMLImageElement;

  constructor()
  {
  	this.cargarImagenes();
  }

	cargarImagenes()
	{
		this.ayuda = new Image();
		this.ayuda.src = "../assets/img/ayuda.png";
		
		this.fondo = new Image();
		this.fondo.src = "../assets/img/fondo.jpg";
		
		this.fondoDetalles = new Image();
		this.fondoDetalles.src= '../assets/img/fondo-puntaje.jpg';

		this.snakeAll = new Image();
		this.snakeAll.src = "../assets/img/snake-all.png";

		this.snake = new Image();
		this.snake.src = "../assets/img/snake.png";

		this.snakeDetalles = new Image();
		this.snakeDetalles.src = "../assets/img/snake-vidas.png";

		this.comida1 = new Image();
		this.comida1.src = "../assets/img/peach.png";

		this.comida2 = new Image();
		this.comida2.src = "../assets/img/strawberry.png";

		this.comida3 = new Image();
		this.comida3.src = "../assets/img/meat.png";

		this.comida4 = new Image();
		this.comida4.src = "../assets/img/broccolee.png";
		
		this.comida5 = new Image();
		this.comida5.src = "../assets/img/star.png";

	}
	
}

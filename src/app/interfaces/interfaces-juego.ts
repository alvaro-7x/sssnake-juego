
export interface Cruceta
{
  x:     number;
  y:     number;
  color: string;
}

export interface Boton
{
  x:     number;
  y:     number;
  color: string;
  texto: string;
  accion:number;
}


export interface TrozoSnake
{
	x: number;
	y: number;
}

export interface Comida
{
	x:      number;
	y:      number;
	tiempo: number;
	tipo:   number;
}

export interface DatoDetalleJuego
{
	texto:        string;
	dato:         number;
	longPadStart: number;
	offsetX:      number;
	longMaxTexto: number;
}

export interface DetallesJuego
{
	score:           number;
	scoreMax:        number;
	vidas:           number;
	nivelJuego:      number;
	versionOriginal: boolean;
}

export interface DireccionHistorial
{
	anterior?: number;
	actual?:   number;
}

export interface PuntoClick
{
	x: number;
	y: number;
}

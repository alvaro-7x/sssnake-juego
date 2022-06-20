export const ResolucionJuego = {
	width: 450,
	height: 600,
	d:25, //
};

export const DatosInicioJuego = {
	x: 15,
	y: 7,
	vx: -1, // tiene que ser igual a la velocidad de la serpiente multiplicado por (+1 movimiento a la derecha) o (-1 movimiento a la izquierda) 
	vy: 0, // tiene que ser igual a la velocidad de la serpiente multiplicado por (+1 movimiento hacia abajo) o (-1 movimiento hacia arriba) 
	velocidadSnake:1,
	velocidadJuego: 256,
	score: 0,
	scoreMax: 7777,
	vidas:3,
	nivelJuego:0,
	puedeAtravesarParedes: false,
	versionOriginal: false,
	juegoPausado: false,
	nivelJuegoIncrementado: false,
	itemEspecialMostrado: false,
	sizeSnakeIncrementarNivel: 10,
	sizeSnakeMostrarItem: 11,
}

export const enum EstadosJuego {
	INICIANDO = 0,
	CORRIENDO = 1,
	CHOQUE = 2,
	PAUSADO = 3,
	FINALIZADO = 4,
}


export const enum Movimientos
{
	LEFT = 1,
	UP = 2,
	RIGHT = 3,
	DOWN = 4,

}

export const enum Acciones
{
	BOTON_A = 5,
	BOTON_B = 6,
	BOTON_START = 7,
	BOTON_RESET = 8,
}

export const MapeoMovimientos = 
[
	{
		tecla: 89, //[Tecla Y]
		movimientoAccion: Movimientos.UP,
	},
	{
		tecla: 72, //[Tecla H]
		movimientoAccion: Movimientos.DOWN,
	},
	{
		tecla: 71, //[Tecla G]
		movimientoAccion: Movimientos.LEFT,
	},
	{
		tecla: 74, //[Tecla J]
		movimientoAccion: Movimientos.RIGHT,
	},

	{
		tecla: 87, //[Tecla W]
		movimientoAccion: Movimientos.UP,
	},
	{
		tecla: 83, //[Tecla WS]
		movimientoAccion: Movimientos.DOWN,
	},
	{
		tecla: 65, //[Tecla A]
		movimientoAccion: Movimientos.LEFT,
	},
	{
		tecla: 68, //[Tecla D]
		movimientoAccion: Movimientos.RIGHT,
	},
	{
		tecla: 82, //[Tecla R]
		movimientoAccion: Acciones.BOTON_RESET,
	},
	{
		tecla: 86, //[Tecla V]
		movimientoAccion: Acciones.BOTON_START,
	},
	{
		tecla: 13, //[Tecla ENTER]
		movimientoAccion: Acciones.BOTON_A,
	},
	{
		tecla: 79, //[Tecla O]
		movimientoAccion: Acciones.BOTON_B,
	}
];

export const ComidasTipo = 
[
	{
		tipo: 'cuadrado',
		valor: 30,
		color: '#212529',
		borde: '#212529',
		especial: false,
	},
	{
		tipo: 'circulo',
		valor: 50,
		color: '#212529',
		borde: '#212529',
		especial: false,
	},
	{
		tipo: 'triangulo-up',
		valor: 70,
		color: '#212529',
		borde: '#212529',
		especial: false,
	},
	{
		tipo: 'triangulo-down',
		valor: -50,
		color: '#212529',
		borde: '#212529',
		especial: false,
	},
	{
		tipo: 'estrella',
		valor: 100,
		color: '#b8860b',
		borde: 'black',
		especial: true,
	},
];

export const TextoAyuda = [
	' * Tecla A para ir a la izquierda.',
	' * Tecla W para ir arriba.',
	' * Tecla D para ir a la derecha.',
	' * Tecla S para ir abajo.',
	' * Tecla ENTER para versión retro.',
	' * Tecla V para pausar/iniciar el juego.',
	' * Tecla R para reiniciar el juego.',
	' * Tecla O para pasar las paredes.',
	' * Haciendo CLIC en los botones.',
];
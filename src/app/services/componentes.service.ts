import { Injectable,Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentesService
{
	@Output() eventoTeclaPrecionada: EventEmitter<any>= new EventEmitter();
	
	constructor() { }
}
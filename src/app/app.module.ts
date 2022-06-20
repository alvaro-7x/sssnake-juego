import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsolaComponent } from './components/consola/consola.component';
import { PantallaComponent } from './components/pantalla/pantalla.component';
import { PuntajeJuegoComponent } from './components/puntaje-juego/puntaje-juego.component';
import { BotonesComponent } from './components/botones/botones.component';
import { BotonComponent } from './components/boton/boton.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsolaComponent,
    PantallaComponent,
    PuntajeJuegoComponent,
    BotonesComponent,
    BotonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  constructor( private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  @ViewChild("txtBuscar") txtBuscar!: ElementRef<HTMLInputElement>;

  buscar( termino: string): void{
    const valor = this.txtBuscar.nativeElement.value;

    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }

}

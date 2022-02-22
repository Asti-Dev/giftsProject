import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  constructor( private gifsService: GifsService) { }

  public get historial() : string[] {
    return this.gifsService.historial;
  }
   
  buscar(termino: string){
    this.gifsService.buscarGifs(termino);
  }

  ngOnInit(): void {
  }

}

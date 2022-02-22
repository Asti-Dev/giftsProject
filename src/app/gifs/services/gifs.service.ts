import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = '3HKZFv22jtP4Ndx2kBfOMVPXatcxPNIO';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  
  public get historial() : string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    if ( localStorage.getItem('historial') ) {
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }
    if (this._historial) {
      this.resultados = JSON.parse( localStorage.getItem('resultados')! );
    }
  }

  buscarGifs( query: string = '') : void{
    query = query.trim().toLocaleLowerCase();
    
    if (!this._historial.includes(query)) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', 10)
          .set('q', query);
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      });

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=3HKZFv22jtP4Ndx2kBfOMVPXatcxPNIO&q=DBZ&limit=10')
    //   .then( resp => {
    //     resp.json().then(data =>{
    //       console.log(data);
    //     })
    //   })
  }
  
}

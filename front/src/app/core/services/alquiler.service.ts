import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  mainURL:string = "http://localhost:4001/alquiler/"
  constructor(private _http:ApiService) { }
  public postAlquiler(body: any): Observable<any> {
    return this._http.post(this.mainURL,body);
  }
  public verificarAlquiler(id: string): Observable<any> {
    return this._http.get(this.mainURL+"verify/" + id);
  }
  public getAlquileres(): Observable<any> {
     return this._http.get(this.mainURL);
  }
    public getbyId(id:string): Observable<any> {
    return this._http.get(this.mainURL+id);
    }
    public deleteAlquiler(id:string): Observable<any> {
       return this._http.delete(this.mainURL+id);
    }
    public putAlquiler(id:string,body:any): Observable<any> {
      return this._http.put(this.mainURL+id,body);
    }
    public getpedidos(id:string): Observable<any> {
      return this._http.get(this.mainURL+"pedidos/"+id);
    }
    public getRevision(): Observable<any> {
       return this._http.get(this.mainURL+"revision/");
    }
    public getGestionados (id:string): Observable<any> {
      return this._http.get(this.mainURL+"gestionados/"+id);
    }

}

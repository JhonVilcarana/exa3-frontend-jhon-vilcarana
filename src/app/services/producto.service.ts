import { Injectable } from '@angular/core';
import {Observable, of , throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';

import { Router } from '@angular/router';
import {catchError,  map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private httpHeaders = new HttpHeaders({ 'Content-Type':'application/json'});
  private rolUrl:string = 'http://localhost:4040/producto';//endpoint
  constructor(private http: HttpClient, private router:Router,
    private authService: AuthService) { }
    private addAuthorizationHeader(){
      let token = this.authService.token;
      if(token!=null){
        return this.httpHeaders.append('Authorization','Bearer '+ token);
      }
      return this.httpHeaders;
    }
    private isNoAutorization(e): boolean{
      if(e.status==401 || e.status==403){
        this.router.navigate(['/login'])
        return true;
      }
      return false;
    }
    getProductos():Observable<any>{
      return this.http.get(this.rolUrl+'/all',{headers:this.addAuthorizationHeader()}).pipe(
        catchError(e =>{
          this.isNoAutorization(e);
          return throwError(e);
        })
      );
}
}

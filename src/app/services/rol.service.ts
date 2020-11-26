import { Injectable } from '@angular/core';
import {Observable, of , throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import { Rol } from '../models/rol';
import { Router } from '@angular/router';
import {catchError,  map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RolService {
  private httpHeaders = new HttpHeaders({ 'Content-Type':'application/json'});
  private rolUrl:string = 'http://localhost:4040/roles';//endpoint

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
  getRoles():Observable<any>{
    return this.http.get(this.rolUrl+'/all',{headers:this.addAuthorizationHeader()}).pipe(
      catchError(e =>{
        this.isNoAutorization(e);
        return throwError(e);
      })
    );
  }
  getRol(id:number):Observable<any> {
    return this.http.get(`${this.rolUrl}/${id}`,{headers:this.addAuthorizationHeader()}).pipe(
      catchError(e =>{
        this.router.navigate(['/roles']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
      })
    );
  }
  updateLogica(id:number):Observable<number> {
    return this.http.put<number>(`${this.rolUrl}/update/logica/${id}`,{headers:this.addAuthorizationHeader()}).pipe(
      map((response:any) =>response),
      catchError(e =>{
        if(this.isNoAutorization(e)){
        return throwError(e)
        }
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  addRol(rol: Rol): Observable<number>{
    return this.http.post<number>(this.rolUrl+"/add", rol, {headers:this.addAuthorizationHeader()}).pipe(
      map((response:any) =>response),
      catchError(e =>{
        if(this.isNoAutorization(e)){
        return throwError(e)
        }
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
      );
  }

  deleteRol(id: number): Observable<number>{
    return this.http.delete<number>(this.rolUrl+"/delete/"+id ,{headers:this.addAuthorizationHeader()}).pipe(
    catchError(e =>{
      if(this.isNoAutorization(e)){
      return throwError(e)
      }
      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
    );
  }

  updateRol(rol: Rol):Observable<number> {
    return this.http.put<number>(`${this.rolUrl}/update/${rol.idrol}`, rol,{headers:this.addAuthorizationHeader()}).pipe(
      map((response:any) =>response),
      catchError(e =>{
        if(this.isNoAutorization(e)){
        return throwError(e)
        }
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario: Usuario;
  private _token: string;
  constructor(private http: HttpClient) { }
  public get usuario(): Usuario{
      if(this._usuario!=null){
        return this._usuario;
      }else if(this._usuario==null && sessionStorage.getItem('usuario')!=null){
        this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
        return this._usuario;
      }
      return new Usuario();
  }
  public get token(): string{
    if(this._token!=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token')!=null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }
  login(usuario:Usuario):Observable<any>{
    const urlEndpoint = 'http://localhost:4040/oauth/token';

    const credenciales = btoa('aea' + ':' + '123');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':'Basic ' + credenciales});
      let params = new URLSearchParams();
      params.set('grant_type','password');
      params.set('username',usuario.username);
      params.set('password',usuario.password);
      console.log(usuario.username);
      console.log(usuario.password);
    return this.http.post(urlEndpoint, params.toString(), {headers:httpHeaders});
  }
  guadarUser(accesToken: string):void{
    let payload = this.obtenerDatosToken(accesToken);
    this._usuario = new Usuario(); 
    this._usuario.idusuario = payload.iduser;
    this._usuario.username = payload.user;  
    this._usuario.nombres = payload.nombre;
    this._usuario.roles = payload.authorities;  
    this._usuario.accesos = payload.acceso;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario)); 
   
  }
  guadarToken(accesToken: string):void{
    this._token = accesToken;
    sessionStorage.setItem('token',accesToken);
  }
  obtenerDatosToken(accessToken:string):any{
    if(accessToken!=null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }
  isAuthenticated():boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length>0){
      return true;
    }else{
      return false;
    }
  }
  logout(){
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }
}

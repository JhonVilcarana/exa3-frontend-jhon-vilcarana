import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
logout():void{
  let username = this.authService.usuario.username;
  this.authService.logout();
  swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito`, 'success')
  this.router.navigate(['/']);
}
}

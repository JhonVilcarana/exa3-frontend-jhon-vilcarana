import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  roles: any;
  rol: any;
  titulo = 'Crear';
  accion = 'Registrar';
  rolModel:Rol = new Rol();
  
  constructor(private rolService: RolService, private router: Router) { }
  ngOnInit(): void {
    alert("sasas");
    this.rolModel.idrol=0;
    this.listar();
  }
  
  delRol(num: number): void {
    swal.fire({
      title: 'Estas seguro?',
      text: "No podras reverti esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolService.deleteRol(num).subscribe(
          response => {
            this.listar()
            swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success')
          })
      }
    })
  }
  listar(): void {
    alert("asas");
    this.rolService.getRoles().subscribe(
      (data) => {
        this.roles = data['cursor_roles'];
        console.log("Roles", this.roles);
      }, (err) => {
        console.log("Error en el listar-rol-component")
      }
    )
  }
  delLogica(num: number): void {
    swal.fire({
      title: 'Estas seguro?',
      text: "No podras reverti esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolService.updateLogica(num).subscribe(
          response => {
            this.listar()
            swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success')
          })
      }
    })
  }
  public create(): void {
    if(this.rolModel.idrol==0){
    this.rolService.addRol(this.rolModel).subscribe(
      response => {
        this.listar();
        swal.fire('Nuevo Rol', `Rol ${this.rolModel.nombre} creado con exito`, "success")
        this.rolModel.nombre= '';
      })
    }else{
      this.rolService.updateRol(this.rolModel).subscribe(
        response=>{
          swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.rolModel.idrol=0;
              this.titulo = 'Crear'
              this.accion = 'Registrar';
              this.listar();
              swal.fire(
                'Actualizado!',
                'El registro ha sido Modificado.',
                'success'
              )
              this.rolModel.nombre= '';
            }
          })    
      })
    }    
  }
  cargarRol(num:number):void{
      if(num){
        this.titulo = 'Update'; 
        this.accion = 'Modificar';
        this.rolService.getRol(num).subscribe(
          (data)=>{
          this.rol=data['cursor_roles'] 
          this.rolModel.nombre=this.rol[0].NOMBRE;
          this.rolModel.idrol=this.rol[0].IDROL;
        })
      }
  }
}

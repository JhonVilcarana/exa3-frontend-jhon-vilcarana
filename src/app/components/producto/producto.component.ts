import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any;
  producto: any;
  titulo = 'Crear';
  accion = 'Registrar';
  productoModel: Producto = new Producto();
  constructor(private productoService: ProductoService , private router: Router) { }

  ngOnInit(): void {
    alert("sasas");
    this.productoModel.idproducto=0;
    this.listar();
  }
  listar(): void {
    alert("asas");
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data['CURSOR_P'];
        console.log("Prod", this.productos);
      }, (err) => {
        console.log("Error en el listar-prod-component")
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/ProductService/product.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  productForm: FormGroup;
  editing: boolean = false;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, Validators.required],
      imagenURL: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onSubmit(): void {
    const product = this.productForm.value;
    if (this.editing) {
      this.productService.updateProduct(product.id, product.nombre, product.descripcion, product.precio, product.imagenURL).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    } else {
      this.productService.createProduct(product).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    }
  }

  editProduct(product: any): void {
    this.productForm.patchValue(product);
    this.editing = true;
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        console.log(response.message);
        this.productService.getProducts().subscribe((data) => {
          this.products = data;
        });
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }
  

  resetForm(): void {
    this.productForm.reset();
    this.editing = false;
  }
}

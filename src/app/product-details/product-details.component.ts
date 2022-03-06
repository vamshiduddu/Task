import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService:ProductService) { }
  public productsAddedToCart: number[] = []

  product:product;
  ngOnInit() {
 
     this.product= this.productService.viewProduct
  }

  productsPresent(id:number)
  {
    let x= this.productService.productsAddedToCart.findIndex(e=>e==id)
    return x==-1?false:true
  }
  addToCart(product: product) {
    this.productService.addToCart(product);
    this.productService.productsAddedToCart.push(product.id)
    this.productsAddedToCart = this.productService.productsAddedToCart
  }
}

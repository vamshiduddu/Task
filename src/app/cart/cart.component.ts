import { Component, OnInit } from '@angular/core';
import { cart } from '../models/cart';
import { product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts:cart[];
  
  
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.carts = this.productService.product;


    console.log(this.productService.product)
  }
  deleteItem(cart:cart)
  {
    this.productService.deleteItem(cart)
    // this.totalPrice()

  }
  updateQuantity(bool:boolean,id:number)
  {
      this.productService.updateCount(id,bool)
      // this.totalPrice()
  }
  totalPrice():number{
    let price =0
     this.productService.product.map(e=>{
      price= e.count*e.products.price 
     })
     console.log(price)
     return price
  }

}

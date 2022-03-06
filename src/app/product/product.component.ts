import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../models/product';
import { cart } from '../models/cart';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnChanges } from '@angular/core';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: product[]
  public productsAddedToCart: number[] = []
  public id: string;

  

  constructor(private http: HttpClient, private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    router.events.subscribe((data) => {
      this.id = this.route.snapshot.params.cat;


    })
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.loadCatDetail(routeParams.cat);
    });
    if (this.route.snapshot.params.cat) {
      this.loadCatDetail(this.id);

    }
    else {
      this.productService.getAllProducts()
        .subscribe(
          data => {
            this.products = data
            console.log(data)
          }
        );
    }
  }
  productsPresent(id: number) {
    let x = this.productService.productsAddedToCart.findIndex(e => e == id)
    return x == -1 ? false : true
  }
  loadCatDetail(cat: string) {
    this.id = this.route.snapshot.params.cat

    console.log(this.id)
    this.productService.getSpecificProducts(this.id)
      .subscribe(
        data => {
          this.products = data
          console.log(data)
        }
      );
  }

  addToCart(product: product) {
    this.productService.addToCart(product);
    this.productService.productsAddedToCart.push(product.id)
    this.productsAddedToCart = this.productService.productsAddedToCart
  }

  add3Dots(text: string, limit: number) {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }

  sendToChild(product: product) {
    this.productService.getProduct(product)
  }




}

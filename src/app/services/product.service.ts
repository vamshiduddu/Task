import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { CartComponent } from '../cart/cart.component';
import { cart } from '../models/cart';
import { product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public product:cart[] =[];
 
  public productsAddedToCart: number[] = []
  viewProduct: product;
  productCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }

  getProduct(product: product) {
    this.viewProduct = product;
  }

  getAllProducts(): Observable<product[]> {
    return this.http.get<product[]>('https://fakestoreapi.com/products')

  }

  getSpecificProducts(cat: string): Observable<product[]> {

    return this.http.get<product[]>('https://fakestoreapi.com/products/category/' + cat);
  }

  addToCart(productAdd: product) {
    if ( this.product.find(ob => ob['products']['id'] == productAdd.id) == undefined) {
      this.product.push(new cart(productAdd, 1))
    }
    else {
      let data =  this.product.find(ob => ob['products']['id'] == productAdd.id);

      let objIndex = this.product.findIndex((obj => obj['products']['id'] == productAdd.id));
      let count = data.count + 1;
      this.product[objIndex].count = count;
    }

    this.productCount.next(this.product.length);

  }

  updateCount(id: number, bool: boolean) {
    let data = this.product.find(ob => ob['products']['id'] == id);

    let objIndex = this.product.findIndex((obj => obj['products']['id'] == id));
    if (bool) {
      let count = data.count + 1;
      this.product[objIndex].count = count;

    }
    else {
      let count = data.count - 1;
      this.product[objIndex].count = count;
    }


  }

  getCategories() {
    return this.http.get<any>('https://fakestoreapi.com/products/categories');
  }

  deleteItem(cart: cart) {
    let index = this.product.findIndex(e => e.products.id == cart.products.id);
    this.product.splice(index, 1);
    this.productCount.next(this.product.length);
  }
  


}

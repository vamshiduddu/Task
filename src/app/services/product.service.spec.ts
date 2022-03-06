import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { product } from '../models/product';
import { cart } from '../models/cart';

const dummyData = [{ "id": 1, "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating": { "rate": 3.9, "count": 120 } }, { "id": 2, "title": "Mens Casual Premium Slim Fit T-Shirts ", "price": 22.3, "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.", "category": "men's clothing", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 4.1, "count": 259 } }, { "id": 3, "title": "Mens Cotton Jacket", "price": 55.99, "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.", "category": "men's clothing", "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", "rating": { "rate": 4.7, "count": 500 } }];
const products: cart[] = [{
  products: {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
          rate: 3.9,
          count: 120
      }
  },
  count: 1
},{
  products: {
      id: 2,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
          rate: 3.9,
          count: 120
      }
  },
  count: 1
}];

const dummyProduct:product=dummyData[0]

describe('ProductService', () => {
  beforeEach(() =>
   TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:[HttpClient]
   })
   
   
   );

  let service: ProductService;
  it('should be created', () => {
    const service: ProductService = TestBed.get(ProductService);
    // const http: ProductService = TestBed.inject(ProductService);
    expect(service).toBeTruthy();
  });


  it('should give all products details',inject([ProductService], (ProductService) =>{

    spyOn(ProductService,'getAllProducts').and.returnValues(of(dummyData))
    expect(ProductService.getAllProducts().subscribe(e=>{
      expect(e).toEqual(dummyData)
    }))
  }))

  it("should return specific product details",inject([ProductService], (ProductService) =>{

    spyOn(ProductService,'getSpecificProducts').and.returnValues(of(dummyData))
    expect(ProductService.getSpecificProducts().subscribe(e=>{
      expect(e).toEqual(dummyData)
    }))
  }))
  it("should return cart length",inject([ProductService], (ProductService) =>{
    ProductService.product=products
    expect(ProductService.product.length).toEqual(2)
  }))
  it("should update cart count length",inject([ProductService], (ProductService) =>{
    spyOn(ProductService,'addToCart').withArgs(dummyProduct[0])
    ProductService.product=products
    ProductService.updateCount(1,true)
    spyOn(ProductService,'updateCount').withArgs(1,true)
    let count = ProductService.product[0].count
    expect(count).toEqual(2)
  }))
  it("should delete item from cart ",inject([ProductService], (ProductService) =>{
    spyOn(ProductService,'addToCart').withArgs(dummyProduct[0])
    ProductService.product=products
    ProductService.deleteItem(products[0])
    spyOn(ProductService,'deleteItem').withArgs(products[0])
    expect(ProductService.products).toBeUndefined()
  }))
   
  
});



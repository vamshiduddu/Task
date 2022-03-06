import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  constructor(private productService:ProductService) { 

    this.productService.productCount.subscribe( value => {
      this.cartCount = value;
  });

  }
  cartCount:number;
  categories:[];

  ngOnInit() {
    this.productService.getCategories().subscribe(
      value=>{
        this.categories=value;
  
      }
    )
    // console.log(this.categories)
  }
  

}

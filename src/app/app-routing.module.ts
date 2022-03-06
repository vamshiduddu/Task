import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  { path: '',component:ProductComponent, pathMatch: 'full' },
  { path: 'specific/:cat',component:ProductComponent, pathMatch: 'full',},
  { path: 'productDetails/:id',component:ProductDetailsComponent, pathMatch: 'full',},
  { path: 'cart', component: CartComponent ,pathMatch: 'full',}, 
  { path: '**', redirectTo: '/' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

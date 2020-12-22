import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any;
  apple: any = [];
  google: any = [];
  samsung: any = [];
  lg: any = [];
  i: any;

  name: String;
  product_id:String;
  img: String;
  price: number;
  added: boolean;
  rating:number;
  colors:String;
  brand:String;
  features:String;

  
  constructor(private authService: AuthService,
    private router: Router, private flashMessage: FlashMessagesService,
    private toastr: ToastrService) {
     }


  ngOnInit() {
    this.authService.getProducts().subscribe(data => {
      this.products = data;
      for (let product of this.products) {
        if (product.brand == "apple") {
          this.apple.push(product);
        }
        else if (product.brand == "google") {
          this.google.push(product);
        }
        else if (product.brand == "samsung") {
          this.samsung.push(product);
        }
        else if (product.brand == "lg") {
          this.lg.push(product);
        }
      }
    }, err => {
      console.log(err);
      return false;
    });
  }

  onEditProduct(product: any) {
    this.authService.storeProductData(product);
    this.router.navigate(['editproduct']);
  }
  onDeleteProduct(product: any) {
    this.authService.deleteProduct(product._id).subscribe(data => {
      if (data.success) {
        this.toastr.success('Successfully Deleted!', 'Delete!', {timeOut: 2000,});
        this.router.navigate(['/']);
      } else {
        this.toastr.error('Something went wrong!', 'Error!', { timeOut: 2000, });
        this.router.navigate(['/products']);
      }
    });
  }

  onAddProductToCart(product){
    const item = {
      name: product.name,
      product_id: product._id,
      img: product.img,
      price: product.price,
      added: true,
      quantity:1
    }
    this.authService.storeItemToOrder(item);
    this.toastr.success('Item is Added to your Cart!', 'Cart!',{
      timeOut: 1000,
    });
   
  }

  onAddProductToWishlist(product){
    const item = {
      name: product.name,
      product_id: product._id,
      img: product.img,
      price: product.price,
      added: true,
      quantity:1
    }
    this.authService.storeItemToWishList(item);
    this.onProductSubmit(item);
    this.toastr.success('Item is Added to your WishList!', 'WishList!',{
      timeOut: 1000,
    });
   
  }

  onProductSubmit(item) {
    const product = {
      name: item.name,
      img: item.img,
      colors: item.colors,
      rating:item.rating,
      brand: item.brand,
      price: item.price,
      features:item.features
    }

    this.authService.addProductToWishList(product).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Successfully Added', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/wishlist']);
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/wishlist']);
      }
    });
    this.name="";
    this.colors="";
    this.brand="";
    this.img="";
    this.rating=0;
    this.features="";


  }

}

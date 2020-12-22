import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  name: String;
  img: String;
  colors: String;
  rating: String;
  brand: String;
  features:String;
  price:number

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService,
    private authservice: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onProductSubmit() {
    const product = {
      name: this.name,
      img: this.img,
      colors: this.colors,
      rating:this.rating,
      brand: this.brand,
      features:this.features,
      price:this.price
    }

    // Required Fields
    if (!this.validateService.validateProduct(product)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authservice.addProduct(product).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Successfully Added', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/products']);
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/addproduct']);
      }
    });
    this.name="";
    this.colors="";
    this.brand="";
    this.img="";
    this.rating="";
    this.features="";
    this.price=0;


  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  items:any;
  quantity:number=1;
  subtotal:number=0;
  totalitems:number=0;
  total:number=0;
  constructor(private authService: AuthService,
    private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.items =this.authService.getOrderFromItems();
    if(this.items==null){
      this.flashMessage.show('Please add some items to Cart', { cssClass: 'alert-danger', timeout: 2000 });
      this.subtotal=0;
      this.total=0;
      this.totalitems=0;
    }
    else{
      for(var i = 0; i < this.items.length; i++){
        this.subtotal = this.subtotal+this.items[i].price;
      }
      this.total=this.subtotal + 6.94;
    }
      
  }
  removeProduct(item){
    this.subtotal=0;
    if (item > -1) {
      this.items.splice(item, 1);
    }
    for(var i = 0; i < this.items.length; i++){
        this.subtotal = this.subtotal+this.items[i].price;
    }
    this.total=this.subtotal + 6.94;
    this.authService.updateItemsInOrder(this.items);
    this.router.navigate(['/cart']);
  }
 
  itemslenth(){
    if(this.items.length ==null|| this.items.length == 0){
      return false; 
    }
    else
    return true;
  }
  checkout(){
    if (this.items.length == null || this.items.length == 0){
     
      this.flashMessage.show('Please add some items to Cart', { cssClass: 'alert-danger', timeout: 3000 });
    }
    else{
      
      this.authService.storeTotal(this.total);
       this.router.navigate(['/checkout']);
    }

  }

  

}

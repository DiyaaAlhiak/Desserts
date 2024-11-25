import { Component } from '@angular/core';
import { DessertsService } from '../home/services/desserts.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
Alldesserts:any
AlltotalPrice:any
  constructor(private _dessertsService:DessertsService){}
  ngOnInit(): void {

    const totalPrice = localStorage.getItem("totalPrices")
    this.AlltotalPrice = totalPrice
    this.getDesserts()
  }



  getDesserts(){

this._dessertsService.getDessert().subscribe((res: any) =>{
  this.Alldesserts = res
    this.Alldesserts.forEach((dessert:any) =>{
console.log(dessert)
    })

})

//     this._dessertsService.desserts$.subscribe(res =>{
//       this.Alldesserts =res
// this.Alldesserts.forEach((dessert: any)  =>{
//   console.log(dessert)
// })
//     })
//   }


  }

}

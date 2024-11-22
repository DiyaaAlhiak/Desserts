import { Component } from '@angular/core';
import { DessertsService } from './services/desserts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  totalItemCount: number = 0;
  AllGetdesserts: any[] = [];
  isButton = true;
  totalPrices =""
  Desserts = [
    {
      id: 1,
      img: "../../assets/img/download (2).jfif",
      DessertNam: "Waffle",
      DessertDetail: "Waffle With Berries",
      Price: 6.50,
      isVisible: false,
      itemCount: 0,
    },
    {
      id: 2,
      img: "../../assets/img/download (3).jfif",
      DessertNam: "Creme Brulee",
      DessertDetail: "Vanilla Bean Creme Brulee",
      Price: 7.50,
      isVisible: false,
      itemCount: 0,
    },
    {
      id: 3,
      img: "../../assets/img/download (8).jfif",
      DessertNam: "Macaron",
      DessertDetail: "Macaron Mix of Five",
      Price: 8.50,
      isVisible: false,
      itemCount: 0,
    },
    {
      id: 4,
      img: "../../assets/img/download (9).jfif",
      DessertNam: "Tiramisu",
      DessertDetail: "Classic Tiramisu",
      Price: 5.50,
      isVisible: false,
      itemCount: 0,
    },
    {
      id: 5,
      img: "../../assets/img/download (10).jfif",
      DessertNam: "Baklava",
      DessertDetail: "Pistachin Baklava",
      Price: 4.50,
      isVisible: false,
      itemCount: 0,
    },
    {
      id: 6,
      img: "../../assets/img/download (11).jfif",
      DessertNam: "Pie",
      DessertDetail: "Lemon Meringue Pie",
      Price: 5.50,
      isVisible: false,
      itemCount: 0,
    },
    {
      id: 7,
      img: "../../assets/img/download (12).jfif",
      DessertNam: "Cake",
      DessertDetail: "Red Velvet Cake",
      Price: 10.50,
      isVisible: false,
      itemCount: 0,
    },
    {
      id: 8,
      img: "../../assets/img/images (1).jfif",
      DessertNam: "Brownie",
      DessertDetail: "Salted Caramel Brownie",
      Price: 5.50,
      isVisible: false,
      itemCount: 0,
    },
    {
      id: 9,
      img: "../../assets/img/download (13).jfif",
      DessertNam: "Panna Cotta",
      DessertDetail: "Vanilla Panna Cotta",
      Price: 5.50,
      isVisible: false,
      itemCount: 0,
    },
  ];

  constructor(private _DessertsService: DessertsService) {}

  ngOnInit(): void {
    localStorage.removeItem("DessertsData");
    this.calculateTotalPrice()
  }

// Function for display state
  toggleVisibility(id: number): void {
    const dessert = this.Desserts.find(d => d.id === id);
    if (dessert) {
      dessert.isVisible = !dessert.isVisible;
      dessert.itemCount = 0;
    }
  }

  // A function to increase the quantity
  increase(id: number): void {
    const dessert = this.Desserts.find(d => d.id === id);
    if (dessert) {
      dessert.itemCount++;
      this.addDessert(dessert);
      this.calculateTotalPrice()
      this.displayDesserts();
    } else {
      console.log('Dessert not found');
    }
  }

  // A function to reduce the quantity
  decrease(id: number): void {

    const dessert = this.Desserts.find(d => d.id === id);
    if (dessert) {
      if (dessert.itemCount > 1) {
        dessert.itemCount--;
        this.addDessert(dessert);
      } else {
        this.removeDessert(id);
        this.toggleVisibility(id);
      }
    } else {
      console.log('Dessert not found');
    }

    if (this.totalItemCount > 0) {
      this.totalItemCount--;
    }

    this.displayDesserts();
  }

  //A function to add or update candy in localStorage
  addDessert(updatedDessert: any): void {
    const storedDesserts = localStorage.getItem('DessertsData');
    let desserts = storedDesserts ? JSON.parse(storedDesserts) : [];
    const index = desserts.findIndex((d: { id: number }) => d.id === updatedDessert.id);

    if (index !== -1) {
      desserts[index] = updatedDessert;
    } else {
      desserts.push(updatedDessert);
    }

    localStorage.setItem('DessertsData', JSON.stringify(desserts));
    console.log("Dessert added or updated in localStorage");
  }

  // Function to delete candy from localStorage
  removeDessert(id: number): void {
    const storedDesserts = localStorage.getItem('DessertsData');
    if (storedDesserts) {
      let desserts = JSON.parse(storedDesserts);
      desserts = desserts.filter((dessert: { id: number }) => dessert.id !== id);
      localStorage.setItem('DessertsData', JSON.stringify(desserts));
      console.log(`Dessert with ID ${id} has been removed from localStorage.`);
    }
  }

  cansleDessert(id: any): void {

    const storedDesserts = localStorage.getItem('DessertsData');
    if (storedDesserts) {
      let desserts = JSON.parse(storedDesserts);

      desserts = desserts.filter((dessert: { id: any }) => dessert.id !== id);

      localStorage.setItem('DessertsData', JSON.stringify(desserts));

      console.log(`Dessert with ID ${id} has been removed from localStorage.`);
    } else {
      console.log('No desserts found in localStorage.');
    }


    this.displayDesserts();
    this.totalItemCount = 0
  }

  // Function to display candy and update the total quantity
  displayDesserts(): void {
    this._DessertsService.desserts$.subscribe((res) => {
      this.AllGetdesserts = res;
      this.totalItemCount = this.AllGetdesserts.reduce(
        (sum, dessert) => sum + dessert.itemCount, 0
      );
    });

    const storedDesserts = localStorage.getItem('DessertsData');
    if (storedDesserts) {
      const desserts = JSON.parse(storedDesserts);
      console.log(desserts, "Stored desserts in localStorage");

      this.AllGetdesserts = desserts;
      this.totalItemCount = this.AllGetdesserts.reduce(
        (sum: number, dessert: { itemCount: number }) => sum + dessert.itemCount,
        0
      );

      console.log(`Total Item Count: ${this.totalItemCount}`);
      this.AllGetdesserts.forEach((dessert: { id: number; DessertNam: string; itemCount: number; Price: number }) => {
        console.log(`Dessert ID: ${dessert.id},
        Name: ${dessert.DessertNam},
        Count: ${dessert.itemCount},
        Price: ${dessert.Price},
        Item Total: ${dessert.itemCount * dessert.Price}`);
      });
    } else {
      console.log('No desserts found in localStorage.');
    }
  }




  calculateTotalPrice(): number {
    const storedDesserts = localStorage.getItem('DessertsData');
    if (storedDesserts) {
      const desserts = JSON.parse(storedDesserts);
      const totalPrice = desserts.reduce(
        (sum: number, dessert: { itemCount: number; Price: number }) =>
          sum + (dessert.itemCount * dessert.Price),
        0
      );
      this.totalPrices = totalPrice
      console.log(`Total Price: $${totalPrice.toFixed(2)}`);
      return totalPrice;
    } else {
      console.log('No desserts found in localStorage.');
      return 0;
    }
  }

}

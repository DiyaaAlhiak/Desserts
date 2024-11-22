import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DessertsService {
  private dessertsSubject = new BehaviorSubject<any[]>([]);
  desserts$ = this.dessertsSubject.asObservable();
  constructor() {
    this.loadDessertsFromLocalStorage();
  }
  private loadDessertsFromLocalStorage(): void {
    const storedDesserts = localStorage.getItem('DessertsData');
    if (storedDesserts) {
      this.dessertsSubject.next(JSON.parse(storedDesserts));
    }
  }

  updateDesserts(newDesserts: any[]): void {
    localStorage.setItem('DessertsData', JSON.stringify(newDesserts));
    this.dessertsSubject.next(newDesserts);
  }
  clearDesserts(): void {
    localStorage.removeItem('DessertsData');
    this.dessertsSubject.next([]);

  }
}

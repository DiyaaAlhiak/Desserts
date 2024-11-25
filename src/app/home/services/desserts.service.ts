import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DessertsService {
  // private dessertsSubject = new BehaviorSubject<any[]>([]);


  getDessert(): Observable<any[]> {
    const storedDesserts = localStorage.getItem('DessertsData');
    const desserts = storedDesserts ? JSON.parse(storedDesserts):  [];
    return of(desserts);
  }









}

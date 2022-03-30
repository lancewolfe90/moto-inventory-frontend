import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bike } from './bike.model';

// const apiBaseUrl = 'http://localhost:8080/api/bikes';
const apiBaseUrl = 'https://jsons-bikes.herokuapp.com/api/bikes';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  findBike(bikeId: number): Observable<any> {
    return this.http.get(`${apiBaseUrl}/${bikeId}`);
  }

  findAllBikes(): Observable<any> {
    return this.http.get(apiBaseUrl);
  }

  searchBikesBy(queryType: string, query: string): Observable<any> {
    const filterOptions = ['vin', 'make', 'type'];
    if (filterOptions.includes(queryType)) {
      return this.http.get(`${apiBaseUrl}/search?${queryType}=${query}`);
    } else {
      return of([]); // Should never occur
    }
  }

  createBike(newBike: Bike): Observable<any> {
    return this.http.post(apiBaseUrl, newBike);
  }

  updateBike(bikeId: number, updatedBike: Bike): Observable<any> {
    return this.http.put(`${apiBaseUrl}/${bikeId}`, updatedBike);
  }

  destroyBike(bikeId: number): Observable<any> {
    return this.http.delete(`${apiBaseUrl}/${bikeId}`);
  }

  sellBike(bikeId: number): Observable<any> {
    return this.http.patch(`${apiBaseUrl}/${bikeId}`, {});
  }
}

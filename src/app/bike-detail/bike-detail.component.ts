import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bike } from '../bike.model';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.css'],
})
export class BikeDetailComponent implements OnInit {
  selectedBike: Bike = {
    vin: '',
    make: '',
    type: '',
    price: NaN,
    purchased: false,
  };
  editingMode = false;

  constructor(private router: Router, private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.selectedBike = {
      bike_id: history.state.bike_id,
      vin: history.state.vin,
      make: history.state.make,
      type: history.state.type,
      price: history.state.price,
      purchased: history.state.purchased,
    };
  }

  toggleEditingMode() {
    this.editingMode = !this.editingMode;
  }

  saveEdits() {
    let temporarySubscription: Subscription;
    if (this.selectedBike.bike_id) {
      temporarySubscription = this.vehicleService
        .updateBike(this.selectedBike.bike_id, this.selectedBike)
        .subscribe((response) => {
          if (response) {
            console.log(response);
            this.editingMode = false;
          }
          if (temporarySubscription) {
            temporarySubscription.unsubscribe();
          }
        });
    }
  }

  deleteBike(id: number | undefined) {
    // Confirmation prompt/warning
    if (id) {
      let temporarySubscription: Subscription;
      temporarySubscription = this.vehicleService
        .destroyBike(id)
        .subscribe((response) => {
          if (response) {
            console.log(response);
          }
          if (temporarySubscription) {
            temporarySubscription.unsubscribe();
          }
        });
      this.router.navigate(['inventory']);
    }
  }

  markAsSold(id: number | undefined): void {
    if (id) {
      let temporarySubscription: Subscription;
      temporarySubscription = this.vehicleService
        .sellBike(id)
        .subscribe((response) => {
          if (response) {
            console.log(response);
          }
          if (temporarySubscription) {
            temporarySubscription.unsubscribe();
            this.router.navigate(['inventory']);
          }
        });
    }
  }
}

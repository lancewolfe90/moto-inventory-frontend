import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bike } from '../bike.model';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-add-bike-dialog',
  templateUrl: './add-bike-dialog.component.html',
  styleUrls: ['./add-bike-dialog.component.css'],
})
export class AddBikeDialogComponent implements OnInit {
  newBike: Bike = {
    vin: '',
    make: '',
    type: '',
    price: 0,
    purchased: false,
  };

  constructor(private router: Router, private vehicleService: VehicleService) {}

  ngOnInit(): void {}

  submitNewBike(form: NgForm): void {
    // Validate form
    let temporarySubscription: Subscription;
    temporarySubscription = this.vehicleService
      .createBike(form.value)
      .subscribe((response) => {
        if (response) {
          console.log(response);
        }
        if (temporarySubscription) {
          // this.router.navigate(['inventory']);
          temporarySubscription.unsubscribe();
          location.reload();
        }
      });
  }
}

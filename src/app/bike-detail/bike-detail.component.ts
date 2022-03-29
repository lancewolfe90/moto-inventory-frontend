import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bike } from '../bike.model';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.css'],
})
export class BikeDetailComponent implements OnInit {
  paramId: string | null = '';
  selectedId: number = NaN;
  selectedBike: Bike = {
    vin: '',
    make: '',
    type: '',
    price: NaN,
    purchased: false,
  };

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.paramId = this.route.snapshot.paramMap.get('id');
    if (this.paramId) {
      this.selectedId = +this.paramId;
      this.retrieveBikeDetails();
    }
  }

  retrieveBikeDetails() {
    this.vehicleService.findBike(this.selectedId).subscribe((response) => {
      console.log('Currently selected bike:', response);
      if (response.vin) {
        this.selectedBike = response;
      } else {
        // Display user-friendly error message
      }
    });
  }
}

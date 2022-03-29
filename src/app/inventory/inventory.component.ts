import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Bike } from '../bike.model';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  filterMethod: string = '';
  inventory: Bike[] = [];
  availableMakes = new Set<string>();
  vinField = new FormControl('', [
    Validators.required,
    Validators.pattern(/[A-Z0-9]{17}/),
  ]);
  makeField = new FormControl('', [Validators.required]);
  typeField = new FormControl('', [Validators.required]);

  constructor(private vehicleService: VehicleService) {}

  getVinErrorMessage() {
    if (this.vinField.hasError('required')) {
      return 'You must enter a value';
    } else {
      return 'The VIN must be 17 letters and/or digits';
    }
  }

  getMakeErrorMessage() {
    return 'You must select one value from the list';
  }

  getTypeErrorMessage() {
    return 'You must enter some text to search by';
  }

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    let temporarySubscription: Subscription;
    temporarySubscription = this.vehicleService
      .findAllBikes()
      .subscribe((bikes) => {
        this.inventory = bikes;
        this.populateDropdown();
        if (temporarySubscription) {
          temporarySubscription.unsubscribe();
        }
      });
  }

  populateDropdown(): void {
    this.inventory.forEach((bike) => {
      if (!this.availableMakes.has(bike.make)) {
        this.availableMakes.add(bike.make);
      }
    });
  }

  submitSearch(ev: Event) {
    let searchContent = '';
    switch (this.filterMethod) {
      case 'vin':
        this.vinField.patchValue(this.vinField.value.toUpperCase());
        searchContent = this.vinField.value;
        break;
      case 'make':
        searchContent = this.makeField.value;
        break;
      case 'type':
        searchContent = this.typeField.value;
        break;
      default:
        break;
    }
    this.vehicleService
      .searchBikesBy(this.filterMethod, searchContent)
      .subscribe((response) => {
        console.log('Server response:', response);
      });
  }
}

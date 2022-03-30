import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  inventory: Bike[] = []; // May need to use async pipe
  bikesToDisplay: Bike[] = [];
  availableMakes = new Set<string>();
  vinField = new FormControl('', [
    Validators.required,
    Validators.pattern(/[A-Z0-9]{17}/),
  ]);
  makeField = new FormControl('', [Validators.required]);
  typeField = new FormControl('', [Validators.required]);

  constructor(private router: Router, private vehicleService: VehicleService) {}

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
        this.bikesToDisplay = [...this.inventory];
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

  // TODO Make search results much more forgiving (e.g., case-insensitive)
  submitSearch() {
    // let temporarySubscription: Subscription;
    let searchContent = '';
    switch (this.filterMethod) {
      case 'vin':
        this.vinField.patchValue(this.vinField.value.toUpperCase());
        searchContent = this.vinField.value;
        let vinSearchResult = this.inventory.find(
          (bike) => bike.vin === searchContent
        );
        if (vinSearchResult) {
          this.bikesToDisplay = [vinSearchResult];
        } else {
          this.bikesToDisplay = [];
        }
        break;
      case 'make':
        searchContent = this.makeField.value;
        let makeSearchResults = this.inventory.filter(
          (bike) => bike.make === searchContent
        );
        if (makeSearchResults.length > 0) {
          this.bikesToDisplay = [...makeSearchResults];
        } else {
          this.bikesToDisplay = [];
        }
        break;
      case 'type':
        searchContent = this.typeField.value;
        let typeSearchResults = this.inventory.filter(
          (bike) => bike.type === searchContent
        );
        if (typeSearchResults.length > 0) {
          this.bikesToDisplay = [...typeSearchResults];
        } else {
          this.bikesToDisplay = [];
        }
        break;
      default:
        break;
    }
    /*
    temporarySubscription = this.vehicleService
      .searchBikesBy(this.filterMethod, searchContent)
      .subscribe((response) => {
        if (response instanceof Array) {
          this.bikesToDisplay = response;
        }
        if (temporarySubscription) {
          temporarySubscription.unsubscribe();
        }
      });
      */
  }

  resetSearch() {
    this.vinField.reset();
    this.makeField.reset();
    this.typeField.reset();
    this.bikesToDisplay = [...this.inventory];
  }

  navigateToDetail(id: number | undefined): void {
    if (!id) {
      // Route to user-friendly "not found" page
    } else {
      const singleBike = this.inventory.find((bike) => bike.bike_id === id);
      this.router.navigate(['inventory', id.toString()], { state: singleBike });
    }
  }
}

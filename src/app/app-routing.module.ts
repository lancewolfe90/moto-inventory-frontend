import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeDetailComponent } from './bike-detail/bike-detail.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  { path: 'inventory', component: InventoryComponent },
  { path: 'inventory/:id', component: BikeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

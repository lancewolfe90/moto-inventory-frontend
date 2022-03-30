export interface Bike {
  bike_id?: number; // Required in server; optional in client
  vin: string;
  make: string;
  type: string;
  price: number;
  purchased: boolean;
}

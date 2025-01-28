export interface BaseItemType {
  id: number;
}

export interface StationItemType extends BaseItemType {
  name: string;
  address: string;
  sign_id: number;
  operator_id: number;
  provider_id: number;
  postalcode_id: number;
  geo_coords_id: number;
  number_pdc: number;
  pdc_id: number;
  access_charging: string;
  accessibility: string;
  update_date_time: string;
  source: string;
}

export interface UserItemType extends BaseItemType {
  firstname: string;
  lastname: string;
  mail: string;
  sex: string;
  birthday: string;
  postal_code_id: number;
  insee_code_id: number;
  number_of_vehicles: number;
}

export interface VehicleItemType extends BaseItemType {
  model: string;
  brand: string;
  user_id: number;
}

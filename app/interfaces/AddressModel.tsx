import {GeoModel} from './GeoModel';

export interface AddressModel {
  street: string;
  suite?: string;
  city: string;
  zipcode: string;
  geo: GeoModel;
}

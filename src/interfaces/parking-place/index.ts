import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ParkingPlaceInterface {
  id?: string;
  status: string;
  organization_id?: string;
  location: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface ParkingPlaceGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  organization_id?: string;
  location?: string;
}

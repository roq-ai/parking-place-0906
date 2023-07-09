import axios from 'axios';
import queryString from 'query-string';
import { ParkingPlaceInterface, ParkingPlaceGetQueryInterface } from 'interfaces/parking-place';
import { GetQueryInterface } from '../../interfaces';

export const getParkingPlaces = async (query?: ParkingPlaceGetQueryInterface) => {
  const response = await axios.get(`/api/parking-places${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createParkingPlace = async (parkingPlace: ParkingPlaceInterface) => {
  const response = await axios.post('/api/parking-places', parkingPlace);
  return response.data;
};

export const updateParkingPlaceById = async (id: string, parkingPlace: ParkingPlaceInterface) => {
  const response = await axios.put(`/api/parking-places/${id}`, parkingPlace);
  return response.data;
};

export const getParkingPlaceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/parking-places/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteParkingPlaceById = async (id: string) => {
  const response = await axios.delete(`/api/parking-places/${id}`);
  return response.data;
};

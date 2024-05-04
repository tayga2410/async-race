import { Car } from '../interface/Car';

const API_BASE_URL = 'http://192.168.0.163:3000';

export const fetchCarList = async (): Promise<Car[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage`);
    if (!response.ok) {
      throw new Error('Failed to fetch car list');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching car list:', error);
    return [];
  }
};

import { Car } from '../interface/Car';

const API_BASE_URL = 'http://192.168.0.163:3000';

export const addCar = async (name: string, color: string): Promise<Car> => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });

    if (!response.ok) {
      throw new Error('Failed to add car');
    }

    const newCar = await response.json();
    return newCar;
  } catch (error) {
    throw error;
  }
};

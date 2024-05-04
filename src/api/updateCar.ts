import { Car } from '../interface/Car';

const API_BASE_URL = 'http://192.168.0.163:3000';

export const updateCar = async (carId: number, updatedCarData: { name: string; color: string }): Promise<Car> => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCarData),
    });

    if (!response.ok) {
      throw new Error('Failed to update car');
    }

    const updatedCar = await response.json();
    return updatedCar;
  } catch (error) {
    throw error;
  }
};

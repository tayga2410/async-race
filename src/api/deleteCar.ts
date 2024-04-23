import { Car } from '../types/Car';

const API_BASE_URL = 'http://192.168.0.163:3000';

export const deleteCar = async (carId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/garage/${carId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
  
      console.log(`Car with ID ${carId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  };
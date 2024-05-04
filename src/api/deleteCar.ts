const API_BASE_URL = 'http://192.168.0.163:3000';

export const deleteCar = async (carId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage/${carId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete car');
    }
  } catch (error) {
    throw error;
  }
};

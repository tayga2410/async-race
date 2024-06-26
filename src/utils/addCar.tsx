import React, { useState } from 'react';
import { Car } from '../interface/Car';
import { addCar } from '../api/addCar';

interface AddCarFormProps {
  onCarAdded: (car: Car) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onCarAdded }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCar = await addCar(name, color);
      onCarAdded(newCar);
      setName('');
      setColor('#000000');
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Car Brand:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Color:
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </label>
      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCarForm;

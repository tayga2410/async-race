import React, { useState, useEffect } from 'react';
import { Car } from '../../types/Car';
import { fetchCarList } from '../../api/carList';
import CarIcon from '../CarIcon/CarIcon';
import './carList.css';
import AddCarForm from '../AddCar/addCar';
import { deleteCar } from '../../api/deleteCar';
import { updateCar } from '../../api/updateCar';
import EditCarForm from '../UpdateCar/updateCar';

const CarList: React.FC = () => {
    const [carList, setCarList] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [updatedName, setUpdatedName] = useState<string>('');
    const [updatedColor, setUpdatedColor] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCarList();
                setCarList(data);
            } catch (error) {
                console.error('Error setting car list:', error);
            }
        };

        fetchData();
    }, []);

    const handleCarAdded = (newCar: Car) => {
        setCarList([...carList, newCar]);
    };

    const handleDeleteCar = async (carId: number) => {
        try {
            await deleteCar(carId);
            const updatedCarList = carList.filter((car) => car.id !== carId);
            setCarList(updatedCarList);
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const handleEditCar = (car: Car) => {
        setSelectedCar(car);
        setUpdatedName(car.name);
        setUpdatedColor(car.color);
    };

    const handleSaveCar = async () => {
        if (!selectedCar) return;

        try {
            const updatedCarData = { name: updatedName, color: updatedColor };
            const updatedCar = await updateCar(selectedCar.id, updatedCarData);

            const updatedCarList = carList.map((car) =>
                car.id === updatedCar.id ? { ...car, name: updatedCar.name, color: updatedCar.color } : car
            );

            setCarList(updatedCarList);
        } catch (error) {
            console.error('Error saving car:', error);
        }
    };

    return (
        <div>
            <div className='car-list__button-group'>
                <AddCarForm onCarAdded={handleCarAdded} />
                <EditCarForm
                    updatedName={updatedName}
                    updatedColor={updatedColor}
                    onNameChange={setUpdatedName}
                    onColorChange={setUpdatedColor}
                    onSave={handleSaveCar}
                />
            </div>
            <ul>
                {carList.map((car) => (
                    <li className='car-list__item' key={car.id}>
                        <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
                        <button onClick={() => handleEditCar(car)}>Edit</button>
                        <CarIcon className='car-list__icon' color={car.color} />
                        {car.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;

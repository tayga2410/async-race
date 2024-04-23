import React, { useState, useEffect } from 'react';
import { Car } from '../../types/Car';
import { fetchCarList } from '../../api/carList';
import CarIcon from '../CarIcon/CarIcon';
import './carList.css';
import AddCarForm from '../AddCar/addCar';
import { deleteCar } from '../../api/deleteCar';
import { updateCar } from '../../api/updateCar';

const CarList: React.FC = () => {
    const [carList, setCarList] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
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
        setIsEditing(true);
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
            setIsEditing(false);
            setSelectedCar(null);
        } catch (error) {
            console.error('Error saving car:', error);
        }
    };


    return (
        <div>
            <AddCarForm onCarAdded={handleCarAdded} />

            <div>
                <h2>Список автомобилей</h2>
                <ul>
                    {carList.map((car) => (
                        <li className='car-list__item' key={car.id}>
                            <button onClick={() => handleDeleteCar(car.id)}>Удалить</button>
                            <button onClick={() => handleEditCar(car)}>Редактировать</button>
                            <CarIcon className='car-list__icon' color={car.color} />
                            {car.name}
                        </li>
                    ))}
                </ul>
            </div>
            {isEditing && selectedCar && (
                <div>
                    <h3>Редактировать машину</h3>
                    <input
                        type='text'
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                    <input
                        type='color'
                        value={updatedColor}
                        onChange={(e) => setUpdatedColor(e.target.value)}
                    />
                    <button onClick={handleSaveCar}>Сохранить</button>
                </div>
            )}
        </div>
    );
};

export default CarList;

import React, { useState, useEffect } from 'react';
import { Car } from '../../interface/Car';
import { fetchCarList } from '../../api/carList';
import CarIcon from '../CarIcon/CarIcon';
import './garage.css';
import AddCarForm from '../../utils/addCar';
import { deleteCar } from '../../api/deleteCar';
import { updateCar } from '../../api/updateCar';
import EditCarForm from '../../utils/updateCar';
import useCarEngine from '../../api/useCarEngine';

const Garage: React.FC = () => {
    const [carList, setCarList] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [updatedName, setUpdatedName] = useState<string>('');
    const [updatedColor, setUpdatedColor] = useState<string>('');
    const [drivingStatus, setDrivingStatus] = useState<{ [key: number]: boolean }>({});
    const { startEngine, stopEngine } = useCarEngine();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCarList();
                setCarList(data);
            } catch (error) {
                console.error('Ошибка при получении списка машин:', error);
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
            const updatedStatus = { ...drivingStatus };
            delete updatedStatus[carId];
            setDrivingStatus(updatedStatus);
        } catch (error) {
            console.error('Ошибка при удалении машины:', error);
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
            console.error('Ошибка при сохранении машины:', error);
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
                        <div>
                            <button onClick={() => startEngine(car.id)}>Start Engine</button>
                            <button onClick={() => stopEngine(car.id)}>Stop Engine</button>
                        </div>
                        <p>{car.name}</p>
                        <div className={`car-icon-container ${drivingStatus[car.id] ? 'driving' : 'stopped'}`}>
                            <CarIcon className='car-list__icon' color={car.color} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Garage;

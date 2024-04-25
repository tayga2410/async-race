import React from 'react';
import { CarForm } from '../interface/CarForm';


const updateCar: React.FC<CarForm> = ({
    updatedName,
    updatedColor,
    onNameChange,
    onColorChange,
    onSave,
}) => {
    return (
        <div>
            <input
                type='text'
                value={updatedName}
                onChange={(e) => onNameChange(e.target.value)}
            />
            <input
                type='color'
                value={updatedColor}
                onChange={(e) => onColorChange(e.target.value)}
            />
            <button onClick={onSave}>Save</button>
        </div>
    );
};

export default updateCar;

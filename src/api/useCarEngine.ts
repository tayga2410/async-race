import { useState } from 'react';

export interface CarEngineInfo {
    velocity: number;
    distance: number;
    success: boolean;
}

const useCarEngine = () => {
    const [isDriving, setIsDriving] = useState<boolean>(false);
    const [carEngineInfo, setCarEngineInfo] = useState<CarEngineInfo | null>(null);
    const [startTimes, setStartTimes] = useState<{ [key: number]: number }>({});

    const startEngine = async (carId: number) => {
        try {
            console.log(`Starting engine for car with ID: ${carId}`);
            const response = await fetch(`http://192.168.0.163:3000/engine?id=${carId}&status=started`, {
                method: 'PATCH'
            });
    
            if (!response.ok) {
                throw new Error(`Failed to start engine. Status: ${response.status}`);
            }
    
            const currentTime = Date.now();
            setStartTimes((prevStartTimes) => ({
                ...prevStartTimes,
                [carId]: currentTime
            }));
            setIsDriving(true);
            console.log('Engine started successfully');
    
            await switchToDriveMode(carId);
        } catch (error) {
            console.error('Error starting engine:', error);
            throw error;
        }
    };
    const stopEngine = async (carId: number) => {
        try {
            console.log(`Stopping engine for car with ID: ${carId}`);
            const response = await fetch(`http://192.168.0.163:3000/engine?id=${carId}&status=stopped`, {
                method: 'PATCH'
            });

            if (!response.ok) {
                throw new Error(`Failed to stop engine. Status: ${response.status}`);
            }

            setIsDriving(false);
            setCarEngineInfo(null);
            console.log('Engine stopped successfully');
        } catch (error) {
            console.error('Error stopping engine:', error);
            throw error;
        }
    };

    const switchToDriveMode = async (carId: number) => {
        try {
            const response = await fetch(`http://192.168.0.163:3000/engine?id=${carId}&status=drive`, {
                method: 'PATCH'
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to switch engine to drive mode. Status: ${response.status}. ${errorData.content}`);
            }
    
            const responseData = await response.json();
            console.log('Engine switched to drive mode successfully:', responseData);
            setCarEngineInfo(responseData);
    
            return responseData;
        } catch (error) {
            console.error('Error switching to drive mode:', error);
            throw error;
        }
    };

    const getElapsedTimeInSeconds = (carId: number) => {
        if (startTimes[carId] && carEngineInfo?.success) {
            const switchTime = startTimes[carId];
            const currentTime = Date.now();
            const elapsedTime = (currentTime - switchTime) / 1000;
            return elapsedTime;
        }
        return 0;
    };


    return { isDriving, carEngineInfo, startEngine, stopEngine, switchToDriveMode, getElapsedTimeInSeconds };
};

export default useCarEngine;

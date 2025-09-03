import React, { useState, useEffect } from 'react';
import { dogTypeService } from '../services/dogTypeService';

const DogTypesPage = () => {
    const [dogTypes, setDogTypes] = useState([]);
    const [selectedDogType, setSelectedDogType] = useState(localStorage.getItem('userDogPreference') || '');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDogTypes = async () => {
            try {
                const data = await dogTypeService.getAll();
                setDogTypes(data);
            } catch (err) {
                setError('Failed to fetch dog types.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDogTypes();
    }, []);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedDogType(selectedValue);
        localStorage.setItem('userDogPreference', selectedValue);
    };

    if (loading) {
        return <div className="p-4 text-center">Loading dog types...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Select Your Favorite Dog Type</h1>
            <div className="mb-6">
                <label htmlFor="dog-type-select" className="block text-sm font-medium text-gray-700 mb-2">Choose a dog type:</label>
                <select
                    id="dog-type-select"
                    value={selectedDogType}
                    onChange={handleSelectChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">--Please choose an option--</option>
                    {dogTypes.map((dogType) => (
                        <option key={dogType.id} value={dogType.name}>
                            {dogType.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedDogType && (
                <p className="text-lg mb-6">
                    Your preferred dog type is: <strong className="text-blue-600">{selectedDogType}</strong>
                </p>
            )}

            <h2 className="text-xl font-semibold mb-4">All Available Dog Types:</h2>
            <ul className="space-y-4">
                {dogTypes.map((dogType) => (
                    <li key={dogType.id} className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-medium text-gray-900">{dogType.name}</h3>
                        <p className="mt-1 text-gray-600">{dogType.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DogTypesPage;

import { useEffect, useState } from 'react';

const useStorage = (storageKey, defaultValue, storage = localStorage) => {
	// Lazy initialization for default value
	const [value, setValue] = useState(() => {
		try {
			const storedValue = storage.getItem(storageKey);
			return storedValue ? JSON.parse(storedValue) : defaultValue;
		} catch (error) {
			console.error('Error parsing stored value', error);
			return defaultValue; // Return default value in case of parsing error
		}
	});

	// Effect to update storage whenever the value changes
	useEffect(() => {
		try {
			if (value !== undefined) {
				storage.setItem(storageKey, JSON.stringify(value));
			}
		} catch (error) {
			console.error('Error setting stored value', error);
		}
	}, [value, storageKey, storage]);

	return [value, setValue];
};

export default useStorage;

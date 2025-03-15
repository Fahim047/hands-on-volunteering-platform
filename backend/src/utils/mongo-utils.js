//  Removes `_id` and replaces it with `id` in each object of the array.
export const removeMongoDBIdFromArray = (collectionArray) => {
	if (!Array.isArray(collectionArray)) {
		throw new Error('Expected an array input.');
	}

	return collectionArray.map((item) => {
		if (item && typeof item === 'object' && item._id) {
			const { _id, ...rest } = item;
			return { id: _id.toString(), ...rest };
		}
		return item;
	});
};

//  * Removes `_id` and replaces it with `id` in an object.
export const removeMongoDBIdFromObject = (obj) => {
	if (!obj || typeof obj !== 'object') {
		throw new Error('Expected an object input.');
	}

	if (obj._id) {
		const { _id, ...rest } = obj;
		return { id: _id.toString(), ...rest };
	}

	return obj;
};

import {
	Data,
	FieldType,
	JsonData,
	JsonObject,
	TypedValue,
} from './types';

function getTypedValue(obj: JsonObject, field: string): TypedValue {
	const value = obj[field];

	if ((typeof value === 'string' || typeof value === 'number') && (field === 'id' || field === '_id' || field === 'guid')) {
		return {
			type: FieldType.ID,
			value,
		};
	}

	if (typeof value === 'boolean') {
		return {
			type: FieldType.BOOLEAN,
			value,
		};
	}

	if (typeof value === 'number') {
		return {
			type: FieldType.NUMBER,
			value,
		};
	}

	if (typeof value !== 'string') {
		return {
			type: FieldType.UNKNOWN,
			value,
		};
	}

	if (/^(.+)@(.+)$/.test(value)) {
		return {
			type: FieldType.EMAIL,
			value,
		};
	}

	if (/\d{4}-[01]\d-[0-3]\d(T|$)/.test(value)) {
		return {
			type: FieldType.DATE,
			value: value.slice(0, 10),
		};
	}

	if (value.length > 255) {
		return {
			type: FieldType.TEXT,
			value,
		};
	}

	return {
		type: FieldType.STRING,
		value,
	};
}

export function parseJson(json: string): Data {
	try {
		const jsonData: JsonData = JSON.parse(json);

		return jsonData.flatMap((obj, objectIndex) => {
			return Object.keys(obj)
				.map((field, fieldIndex) => {
					const typedValue = getTypedValue(obj, field);
					return ({
						descriptor: {
							objectIndex,
							field,
							isFirst: fieldIndex === 0,
						},
						typedValue,
					});
				});
		});
	} catch (error) {
		throw Error('Not valid JSON file');
	}
}

export function buildJson(data: Data): string {
	const jsonData: JsonData = [];

	data.forEach((item) => {
		const {
			objectIndex,
			field,
		} = item.descriptor;
		if (!jsonData[objectIndex]) {
			jsonData[objectIndex] = {};
		}

		const obj = jsonData[objectIndex];
		obj[field] = item.typedValue.value;
	});

	return JSON.stringify(jsonData, null, 2);
}

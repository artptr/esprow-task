export enum FieldType {
	UNKNOWN,
	ID,
	NUMBER,
	BOOLEAN,
	STRING,
	EMAIL,
	DATE,
	TEXT,
}

export type FieldDescriptor = {
	objectIndex: number;
	field: string;
	isFirst: boolean;
};

export type TypedValue = {
	type: FieldType.ID;
	value: string | number;
} | {
	type: FieldType.STRING | FieldType.TEXT | FieldType.DATE | FieldType.EMAIL;
	value: string;
} | {
	type: FieldType.NUMBER;
	value: number;
} | {
	type: FieldType.BOOLEAN;
	value: boolean;
} | {
	type: FieldType.UNKNOWN;
	value?: undefined;
};

export type JsonValue = TypedValue['value'];

export type JsonObject = { [key: string]: JsonValue };

export type JsonData = JsonObject[];

export type FieldData = {
	descriptor: FieldDescriptor;
	typedValue: TypedValue;
};

export type Data = FieldData[];

export type FieldContext = {
	getField: (index: number) => FieldData;
	setValue: (index: number, nextValue: TypedValue) => void;
};

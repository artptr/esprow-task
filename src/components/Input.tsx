import React, { ChangeEventHandler } from 'react';
import styles from './Input.module.css';

type TextInputProps = {
	type: 'text' | 'email' | 'date';
	value: string;
	textarea: boolean;
	onChange: (value: string) => void;
};

type NumberInputProps = {
	type: 'number';
	value: number;
	textarea: false,
	onChange: (value: number) => void;
};

type InputProps = TextInputProps | NumberInputProps;

Input.defaultProps = {
	type: 'text',
	textarea: false,
};

function isNumberInputProps(inputProps: InputProps): inputProps is NumberInputProps {
	return inputProps.type === 'number';
}

export function Input(inputProps: InputProps) {
	const { type, textarea, value } = inputProps;

	const Component = textarea ? 'textarea' : 'input';
	const className = textarea ? styles.textarea : styles.input;

	const handleChange: ChangeEventHandler<HTMLInputElement> & ChangeEventHandler<HTMLTextAreaElement> = (event) => {
		if (isNumberInputProps(inputProps)) {
			// eslint-disable-next-line react/destructuring-assignment
			inputProps.onChange(+event.target.value);
		} else {
			// eslint-disable-next-line react/destructuring-assignment
			inputProps.onChange(event.target.value);
		}
	};

	return (
		<Component
			className={className}
			type={type}
			value={value}
			onChange={handleChange}
		/>
	);
}

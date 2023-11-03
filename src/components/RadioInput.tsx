import React, { useId } from 'react';

interface RadioInputProps<T> {
	options: { label: string, value: T }[];
	value: T;
	onChange: (value: T) => void;
}

export function RadioInput<T>({ options, value, onChange }: RadioInputProps<T>) {
	const id = useId();

	return (
		<div>
			{options.map((option, index) => {
				const optionId = id + index;

				return (
					<label
						key={optionId}
						htmlFor={optionId}
					>
						<input
							id={optionId}
							name={id}
							type="radio"
							checked={value === option.value}
							onChange={() => onChange(option.value)}
						/>
						{option.label}
					</label>

				);
			})}
		</div>
	);
}

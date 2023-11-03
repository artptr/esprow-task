import React from 'react';
import { ListChildComponentProps } from 'react-window';
import { FieldContext, FieldType } from './types';
import styles from './Field.module.css';
import { Input } from '../components/Input';
import { RadioInput } from '../components/RadioInput';

const HEIGHT_EMPTY_ITEM = 0;
const HEIGHT_REGULAR_ITEM = 40;
const HEIGHT_TEXTAREA_ITEM = 70;
const CARD_MARGIN = 20;

export function Field({ style, index, data: context }: ListChildComponentProps<FieldContext>) {
	const { descriptor, typedValue } = context.getField(index);

	const extStyle = {
		...style,
		'--card-margin': `${CARD_MARGIN}px`,
	};

	return (
		<div
			style={extStyle}
			className={descriptor.isFirst ? styles.first : undefined}
		>
			{typedValue.type === FieldType.UNKNOWN
				? null
				: (
					<div className={styles.field}>
						<div className={styles.label}>
							{descriptor.field}
						</div>
						<div className={styles.inputWrapper}>
							<FieldEditor index={index} context={context} />
						</div>
					</div>
				)}
		</div>
	);
}

export function getFieldHeight(type: FieldType, isFirst: boolean) {
	let height;

	switch (type) {
	case FieldType.UNKNOWN:
		height = HEIGHT_EMPTY_ITEM;
		break;

	case FieldType.TEXT:
		height = HEIGHT_TEXTAREA_ITEM;
		break;

	default:
		height = HEIGHT_REGULAR_ITEM;
	}

	if (isFirst) {
		height += CARD_MARGIN;
	}

	return height;
}

interface FieldEditorProps {
	index: number;
	context: FieldContext;
}

function FieldEditor({ index, context }: FieldEditorProps) {
	const { typedValue } = context.getField(index);

	const setValue = (value: typeof typedValue.value) => {
		context.setValue(index, { type: typedValue.type, value } as typeof typedValue);
	};

	switch (typedValue.type) {
	case FieldType.ID: {
		return (
			<div>{ typedValue.value }</div>
		);
	}

	case FieldType.STRING: {
		return (
			<Input value={typedValue.value} onChange={setValue} />
		);
	}

	case FieldType.TEXT: {
		return (
			<Input textarea value={typedValue.value} onChange={setValue} />
		);
	}

	case FieldType.EMAIL: {
		return (
			<Input type="email" value={typedValue.value} onChange={setValue} />
		);
	}

	case FieldType.DATE: {
		return (
			<Input type="date" value={typedValue.value} onChange={setValue} />
		);
	}

	case FieldType.NUMBER: {
		return (
			<Input type="number" value={typedValue.value} onChange={setValue} />
		);
	}
	case FieldType.BOOLEAN: {
		return (
			<RadioInput
				options={[
					{ label: 'true', value: true },
					{ label: 'false', value: false },
				]}
				value={typedValue.value}
				onChange={setValue}
			/>
		);
	}

	default:
		return null;
	}
}

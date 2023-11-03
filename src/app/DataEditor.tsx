import React from 'react';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import { Field, getFieldHeight } from './Field';
import { Data, FieldContext, TypedValue } from './types';

interface DataEditorProps {
	data: Data;
	onChange: (nextValue: Data) => void;
}

export function DataEditor({ data, onChange }: DataEditorProps) {
	const itemData: FieldContext = {
		getField: (index: number) => {
			return data[index];
		},

		setValue: (index: number, nextValue: TypedValue) => {
			const nextData = [...data];
			if (nextData[index].typedValue.type === nextValue.type) {
				nextData[index].typedValue = nextValue;
				onChange(nextData);
			} else {
				throw Error('Mismatched types');
			}
		},
	};

	const itemSize = (index: number) => {
		const { typedValue, descriptor } = data[index];

		return getFieldHeight(typedValue.type, descriptor.isFirst);
	};

	return (
		<AutoSizer>
			{({ width, height }: Size) => (
				<VariableSizeList<FieldContext>
					width={width}
					height={height}
					itemCount={data.length}
					itemData={itemData}
					itemSize={itemSize}
				>
					{Field}
				</VariableSizeList>
			)}
		</AutoSizer>
	);
}

import React, { useState } from 'react';
import { DataEditor } from './DataEditor';
import { Data } from './types';
import { FileManager } from './FileManager';
import styles from './App.module.css';

export function App() {
	const [data, setData] = useState<Data>([]);
	const [count, setCount] = useState(0);

	const handleLoad = (data: Data) => {
		setData(data);
		setCount(value => value + 1);
	};

	return (
		<div className={styles.root}>
			<div className={styles.sourcePane}>
				<FileManager
					data={data}
					onLoad={handleLoad}
				/>
			</div>
			<div className={styles.editorPane}>
				<DataEditor
					key={count}
					data={data}
					onChange={setData}
				/>
			</div>
		</div>
	);
}

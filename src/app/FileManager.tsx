import React, {
	ChangeEventHandler,
	MouseEventHandler,
	useEffect,
	useId,
	useState,
} from 'react';
import { buildJson, parseJson } from './files';
import { Data } from './types';
import styles from './FileManager.module.css';

interface FileManagerProps {
	data: Data;
	onLoad: (data: Data) => void;
}

export function FileManager({ data, onLoad }: FileManagerProps) {
	const fileInputId = useId();
	const [href, setHref] = useState('#');

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(href);
		};
	}, [href]);

	const handleOpenFile: ChangeEventHandler<HTMLInputElement> = async (event) => {
		const { files } = event.target;
		if (files) {
			const json = await files[0].text();
			onLoad(parseJson(json));
		}
	};

	const handleDownloadFile: MouseEventHandler<HTMLAnchorElement> = (event) => {
		const json = buildJson(data);
		const blob = new Blob([json], { type: 'application/javascript' });
		setHref(URL.createObjectURL(blob));
	};

	return (
		<div className={styles.root}>
			<div>
				<label htmlFor={fileInputId}>
					<input
						id={fileInputId}
						type="file"
						onChange={handleOpenFile}
					/>
				</label>
			</div>
			<div>
				<a
					href={href}
					onClick={handleDownloadFile}
					type="application/json"
					download
				>
					Download
				</a>
			</div>
		</div>
	);
}

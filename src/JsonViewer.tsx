import React, { useState } from 'react';
import './JsonViewer.css';

function getInfo(data: any): [boolean, string] {
	if (typeof data === 'boolean') return [true, 'lightblue'];
	if (typeof data === 'string') return [true, 'lightgreen'];
	if (typeof data === 'number') return [true, 'yellow'];
	return [data === null, 'white'];
}

const JsonViewer: React.FC<{ data: any; isLast?: boolean }> = ({ data, isLast = true }) => {
	const [open, setOpen] = useState<boolean>(true);

	const [isPremitive, color] = getInfo(data);

	if (isPremitive) {
		return (
			<span style={{ color }}>
				{JSON.stringify(data)}
				{!isLast && ','}
			</span>
		);
	}

	if (Array.isArray(data)) {
		return (
			<div className="jsonViewer">
				<button onClick={() => setOpen((prev) => !prev)}>{open ? '➕' : '➖'}</button>
				{'['}

				{open ? (
					<div className="jsonViewer">
						{data.map((obj, index) => (
							<JsonViewer data={obj} isLast={index === data.length - 1} />
						))}
					</div>
				) : (
					'...'
				)}
				{']'}
				{!isLast && ','}
			</div>
		);
	}

	if (typeof data === 'object') {
		return (
			<div className="jsonViewer">
				<button onClick={() => setOpen((prev) => !prev)}>{open ? '➕' : '➖'}</button>
				{'{'}
				{open ? (
					<div className="jsonViewer">
						{Object.entries(data).map(([key, value], index) => (
							<div>
								<span style={{ color: 'pink' }}>"{key}"</span>: <JsonViewer data={value} isLast={index === Object.keys(data).length - 1} />
							</div>
						))}
					</div>
				) : (
					'...'
				)}
				{'}'}
				{!isLast && ','}
			</div>
		);
	}

	return <div>unknown</div>;
};

export default JsonViewer;

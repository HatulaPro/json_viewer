import { useEffect, useState } from 'react';
import './App.css';
import JsonViewer from './JsonViewer';

function App() {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		if (!data) {
			fetch('/data.json')
				.then((res) => res.json())
				.then((d) => setData(d));
		}
	}, [data, setData]);

	return (
		<div className="App">
			<JsonViewer data={data} />
		</div>
	);
}

export default App;

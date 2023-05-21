import "./App.css";
import Item from "../src/components/item";
import React, { useEffect, useState } from "react";
import todoApi from './services/apiHandler';

function App() {
	const [itens, setItens] = useState([]);
	const [filter, setFilter] = useState({ filter: false, active: false })

	//me
	const [search, setSearch] = React.useState("");
	console.log(search);
	const searchLowerCase = search.toLowerCase()
	
	//end
	

	function getList() {
		fetch('http://localhost:3000/to-do/list')
			.then(response => response.json())
			.then(data => {
				setItens(data.data)
			});
	}

	function handleUpdate(item) {
		if (item.delete) {
			todoApi('delete', 'delete', item).then(data => {
				getList()
			})
			return;
		}

		todoApi('update', 'put', item).then(data => {
			getList()
		})
	}

	function handleAdd() {
		todoApi('insert', 'post', { "text": "", "active": "true" })
			.then(data => {
				console.log(data)
				getList()
			})
	}

	const itensToShow = filter.filter
		? itens.filter(item => item.active === filter.active)
		: itens

	useEffect(() => {
		getList()
	}, [])

	//me code
	const items = itensToShow.filter((item) => 
	item.text.toLowerCase().includes(searchLowerCase));
	//end

	return (

		<div className="main">
			<div className="to-do-list">
				<h1>To Be Read</h1>

				{itensToShow.map((item) => {
					return (
						<Item
							key={item._id}
							itens={itens}
							item={item}
							handleUpdate={handleUpdate}
						/>
					);
				})}
				<div className="rowContainer">
					<span className={"filter"} style={filter.filter ? {} : { fontWeight: "bold" }} onClick={() => setFilter({ filter: false })}>Todos</span>
					<span className={"filter"} style={(filter.filter && filter.active === true) ? { fontWeight: "bold" } : {}} onClick={() => setFilter({ filter: true, active: true })}>Pendentes</span>
					<span className={"filter"} style={(filter.filter && filter.active === false) ? { fontWeight: "bold" } : {}} onClick={() => setFilter({ filter: true, active: false })}>Concluidos</span>
				</div>
				<div className="rowContainer">
					<button onClick={handleAdd}>Adicionar</button>
				</div>

				
			   <h3>Filtrar To be Read</h3>
				<input type="search" className="card" value={search} 
				onChange={(e) => setSearch(e.target.value)}/>
				<ul>
					{items.map((item) => (
					<li key={item.text} className="card" style={{width:'full'}}>
						<p>{item.text}</p>
					</li>
					))}
				</ul>
				

			</div>

		</div>
	);
}

export default App;

import "../App.css"
import Item from "./item"
import React, { useEffect, useState } from "react";
import todoApi from "../services/apiHandler";

function Home() {
	const [itens, setItens] = useState([]);
	const [filter, setFilter] = useState({ filter: false, active: false });
	const [search, setSearch] = React.useState("");
	const searchLowerCase = search.toLowerCase();
	

	const itensToShow = filter.filter
		? itens.filter(item => item.active === filter.active)
		: itens

	const items = itens.filter((item) => 
	item.text.toLowerCase().includes(searchLowerCase));


	function getList() {
		fetch('http://localhost:4000/livros/list/')
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




	useEffect(() => {
		getList()
	}, [])



	return (
		<div className="main">
			<div className="to-do-list">
				<div className="parag">
					<h1>To Be Read</h1>
					<picture>
						<source media="(max-width:600)" srcSet="menina-livro.svg"></source>
						<img src='menina-livro.svg' class="menina-livro" alt='lendo'></img>
					</picture>
					</div>
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
				<span className={"filter"} style={(filter.filter && filter.active === true) ? { fontWeight: "bold" } : {}}
					onClick={() => setFilter({ filter: true, active: true })}>Lendo</span>
				<span className={"filter"} style={(filter.filter && filter.active === false) ? { fontWeight: "bold" } : {}}
					onClick={() => setFilter({ filter: true, active: false })}>Lidos</span>
			</div>
			<div>
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
export default Home;
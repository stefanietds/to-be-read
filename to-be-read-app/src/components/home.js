import "../App.css"
import Item from "./item"
import React, { useEffect, useState } from "react";
import todoApi from "../services/apiHandler";
import Filter from "./filter";

function Home(){
    const [itens, setItens] = useState([]);
	const [filter, setFilter] = useState({ filter: false, active: false })
	
	const itensToShow = filter.filter
		? itens.filter(item => item.active === filter.active)
		: itens

	
	
    function getList() {
		fetch('http://localhost:4000/livros/list')
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
					<span className={"filter"} style={(filter.filter && filter.active === true) ? { fontWeight: "bold" } : {}} 
					onClick={() => setFilter({ filter: true, active: true })}>Lendo</span>
					<span className={"filter"} style={(filter.filter && filter.active === false) ? { fontWeight: "bold" } : {}} 
					onClick={() => setFilter({ filter: true, active: false })}>Lidos</span>
				</div>
				<div>
					<button onClick={handleAdd}>Adicionar</button>
				</div>
                </div>
		</div>
    );
}
export default Home;
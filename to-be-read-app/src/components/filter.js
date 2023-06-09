import React from "react";
import { items, itensToShow } from "./home";

export default function Filter({ items, itensToShow }){
   //problemas na importação
    const [search, setSearch] = React.useState("");
	console.log(search);
	const searchLowerCase = search.toLowerCase()

    items = itensToShow.filter((item) => 
	item.text.toLowerCase().includes(searchLowerCase));
    
    return(
        <div>
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
    );
}
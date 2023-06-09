import "./App.css";
import Home from "./components/home";
import { Link, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import axios from "axios";
import Filtro from "./components/filter";
import PaginaInicial from "./components/inicial";

function App() {
  const token = sessionStorage.getItem("token");

  const handleLogout = (event) =>{
    axios.post('http://localhost:4000/users/logout',{withCredentials: true}).then(resposta => {
      console.log(resposta);
      sessionStorage.removeItem('token');
      window.location.reload();
    });
  };

  if(!token)
       return <Login />

  //apos arrumar o filtro inserir no return
	return(
		<div className="App">
       <a href='#logout' onClick={handleLogout}>Sair</a>
      <nav>
        <ul>
          <li><a href="#PaginaInicial">Pagina Inicial</a></li>
          <li><a href="#Home">Home</a></li>
          <li><a href="#Filter">Filter</a></li>
        </ul>
      </nav>
      <main>
        <section id="PaginaInicial"><PaginaInicial/></section>
        <section id="Home"><Home/></section>
      </main>
    </div>
  );
}

export default App;

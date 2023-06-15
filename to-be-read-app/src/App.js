import "./App.css";
import Home from "./components/home";
import Login from "./components/Login";
import axios from "axios";
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
     
	return(
		<div className="App">
      <div className="Sair">
       <a href='#logout' onClick={handleLogout}>Sair</a>
      </div>
      <div className="J1">
        
        <ul className="nav" >
          <li><a href="#Pagina Inicial">Pagina Inicial</a></li>
          <li><a href="#Home">Home</a></li>
        </ul>
        <div className="para">
         <h1> Seja bem vindo !! </h1>
      </div>
      </div>
      <main>
        <section id="PaginaInicial"><PaginaInicial/></section>
        <section id="Home"><Home/></section>
      </main>
    </div>
    
  );
}

export default App;

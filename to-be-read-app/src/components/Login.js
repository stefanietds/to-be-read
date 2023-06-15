import '../Login.css';
import axios from "axios";
import { useState } from "react";

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = (event) => {
        if (usuario && senha) {
            event.preventDefault();//cancela a submissão externa do form
            axios.post('http://localhost:4000/users/login',
                { usuario: usuario, senha: senha }, { withCredentials: true }).then(resposta => {
                    if (resposta.data.token) {
                        sessionStorage.setItem('token', resposta.data.token);
                        window.location.reload();
                    } else {
                        alert(resposta.data.message);
                    }
                });
        }
    }
    return (
        <body>
            <div className="form-login">
                <div class="main-login">
                    <div class="left-login"></div>

                </div>
                <div class="main-login">
                    <div class="left-login">
                        <h1>Faça o login <p> E entre para seu marcador virtual de livros</p></h1>
                        <img src='tarefa.svg' class="left-login-image" alt='tarefa'></img>
                    </div>
                    <div class="right-login"></div>
                    <div class="card-login">
                        <h1>LOGIN</h1>

                        <div class="textfield">
                            <label>Usuário</label>
                            <input type="text" id="usuario" placeholder="Usuário" onChange={(e) => setUsuario(e.target.value)} required />
                        </div>
                        <div class="textfield">
                            <label>Senha</label>
                            <input type="password" id="senha" placeholder='Senha' onChange={(e) => setSenha(e.target.value)} required />
                        </div>
                        <button class="btn-login" type="submit" onClick={handleLogin}>Entrar</button>

                    </div>
                </div>
            </div>
        </body>
    );
}  
import axios from "axios";
import { useState } from "react";

export default function Login(){
    const [usuario,setUsuario] = useState('');
    const [senha,setSenha] = useState('');

    const handleLogin = (event) => {
        if(usuario && senha){
            event.preventDefault();//cancela a submissão externa do form
            axios.post('http://localhost:4000/users/login',
            {usuario: usuario, senha: senha},{withCredentials: true}).then(resposta => {
                if(resposta.data.token){
                    sessionStorage.setItem('token', resposta.data.token);
                    window.location.reload();
                }else{
                    alert(resposta.data.message);
                }
            });
        }
    }
    return(
        <div className="form-login">
            <form>
                <label>Usuário</label>
                <input type="text" id="usuario" onChange={(e)=> setUsuario(e.target.value)} required />
                <label>Senha</label>
                <input type="password" id="senha" onChange={(e)=> setSenha(e.target.value)} required />
                <button type="submit" onClick={handleLogin}>Entrar</button>
            </form>
        </div>
    );
}
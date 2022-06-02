import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from  "axios";
import { useState } from 'react';
import UserContext from '../context/UserContext';
import { useContext } from "react";
import logo from '../img/Driven.png'

function Login(){
    const navigate = useNavigate();
    const [dadosLogin, setDadosLogin] = useState({email:"",password:""});
    const {usuario, setUsuario} = useContext(UserContext);
    
    function confirmarLogin(event){
        event.preventDefault();
        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login"

        const promise = axios.post(URL, {
            email: dadosLogin.email,
            password: dadosLogin.password
        });

        promise.then((response) => {
            localStorage.setItem("userdata", JSON.stringify({
                id: response.data.id,
                name: response.data.name,
                cpf: response.data.cpf,
                email: response.data.email,
                password: response.data.password,
                membership: response.data.membership,
                token: response.data.token
            }));
            setUsuario({...usuario,id: response.data.id, cpf: response.data.cpf, password: response.data.password, membership: response.data.membership,  email: response.data.email, name: response.data.name, token: response.data.token});

        });
        promise.catch(erro=> alert(erro.response.statusText));
        if(usuario.membership === null){
            navigate('/subscriptions'); 
        }
        else{
            navigate('/home')
        }
        
    }
    function irParaCadastro(){
        navigate("/sign-up");
    }
    
    return(
        <Fundo onSubmit={confirmarLogin}>
            <form>
                <div></div>
                <img src={logo}/>
                <input placeholder="email" type="email" value={dadosLogin.email} required onChange={e=> setDadosLogin({...dadosLogin, email: e.target.value})}/>
                <input placeholder="senha" type="password" value={dadosLogin.password} required onChange={e=> setDadosLogin({...dadosLogin, password: e.target.value})}/>
                <button>Entrar</button>
                <p onClick={irParaCadastro}>Não possuí uma conta? Cadastre-se</p>
            </form>
        </Fundo>
    )
}
export default Login;

const Fundo = styled.div`
    width: 375px;
    height: 667px;
    background: black;
    text-align: center;
    div{
        height: 140px;
    }

    input{
        width: 300px;
        height: 45px;
        margin-bottom: 15px;
        background: #FFFFFF;
        border-radius: 8px;
        padding-left: 10px;

    }
    
    button{
        width: 300px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;
        margin-top: 10px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
    
    p{
        margin-top: 40px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-decoration-line: underline;

        color: #FFFFFF;

    }
    img{
        margin-bottom: 90px;
    }`;
    
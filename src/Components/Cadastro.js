import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from  "axios";
import { useState } from 'react';

function Cadastro(){
    const navigate = useNavigate();
    const [dadosCadastro, setDadosCadastro] = useState({email:"", name:"", cpf:"", password:""});

    function confirmarCadastro(event){
        event.preventDefault();
        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up"

        const promise = axios.post(URL, {
            email: dadosCadastro.email,
            name: dadosCadastro.name,
            cpf: dadosCadastro.cpf,
            password: dadosCadastro.password
        });

        promise.then(()=>{
            console.log("sucesso");
            navigate("/")
        });
        promise.catch(erro=>alert(erro.response.statusText));
    }

    function irParaLogin(){
        navigate("/");
    }
    return(
        <Fundo onSubmit={confirmarCadastro}>
            <form>
                <div></div>
                <input placeholder="nome" type="text" value={dadosCadastro.name} required onChange={e=> setDadosCadastro({...dadosCadastro, name: e.target.value})}/>
                <input placeholder="CPF" type="text" value={dadosCadastro.cpf} required onChange={e=> setDadosCadastro({...dadosCadastro, cpf: e.target.value})}/>
                <input placeholder="email" type="email" value={dadosCadastro.email} required onChange={e=> setDadosCadastro({...dadosCadastro, email: e.target.value})}/>
                <input placeholder="senha" type="password" value={dadosCadastro.password} required onChange={e=> setDadosCadastro({...dadosCadastro, password: e.target.value})}/>
                <button>Cadastrar</button>
                <p onClick={irParaLogin}>Já possui uma conta? Entre</p>
            </form>
        </Fundo>
    )
}
export default Cadastro;

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

    }`;
    
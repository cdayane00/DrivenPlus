import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from  "axios";
import { useState,useEffect } from 'react';
import UserContext from '../context/UserContext';
import { useContext } from "react";
import { Link } from "react-router-dom";

function Planos({setInit}){

    const {usuario} = useContext(UserContext);
    const [planos, setPlanos] = useState([]);
    const config = {
        headers: {
            Authorization: `Bearer ${usuario.token}`,
        },
    };

    useEffect(()=>{
        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships";
       

        const promise = axios.get(URL, config);
        promise.then((response)=>{
            setPlanos(response.data);
        })
        promise.catch((erro)=>{
            alert(erro.response.statusText);
        }) 
    },[])

    function IdPlanos({id,image, price}){
        return(
            <Link onClick={()=>setInit(true)} to={`/subscriptions/${id}`}>
                <div className='planos'>
                    <img key={`plano ${id}`} src={image}/>
                    <p>R${price}</p>
                </div>
            </Link>
        )

    }
    return(
        <Fundo>
            <div></div>
            <h1>Escolha seu plano</h1>
            <Plano>
                {planos.map(plano => <IdPlanos id={plano.id} image={plano.image} price={plano.price}/>)}
            </Plano>

        </Fundo>
        
    )
}
export default Planos;

const Plano = styled.div`
    width: 300px;
    height: 600px;
    margin-top: 30px;

    .planos{
        display-flex;
        width: 290px;
        height: 180px;
        margin-left: 43px;
        margin-bottom:10px;
        background: #0E0E13;
        border: 3px solid #7E7E7E;
        border-radius: 12px;
        
    }

    .planos img{
        margin-top: 45px;
        margin-left: 20px;
    }

    .planos p{
        width: 30px;
        height: 20px;
        margin-left: 180px;
        margin-bottom: 100;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        text-decoration-line: underline;
        color: #FFFFFF;

    }
    `

const Fundo = styled.div`
    width: 375px;
    height: 667px;
    background: black;

    div{
        height: 20px;
    }

    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
        margin-left: 60px;

    }`;
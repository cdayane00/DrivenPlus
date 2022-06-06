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
    })

    function IdPlanos({id,image, price}){
        return(
            <Link to={`/subscriptions/${id}`}>
                <img onClick={()=>setInit(true)} key={`plano ${id}`} src={image}/>
                <p>{price}</p>
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

    p{
        margin-left: 270px;
    }
    `

const Fundo = styled.div`
    width: 375px;
    height: 667px;
    background: black;
    text-align: center;

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

    }`;
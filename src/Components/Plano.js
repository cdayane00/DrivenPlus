import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';

function Plano(){
    const {id} = useParams();
    const {usuario} = useContext(UserContext);
    const [plano,setPlano] = useState([]);


    useEffect(()=>{
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`,
            },
        };
        const promise = axios.get(URL,config);
        promise.then((response)=>{
            setPlano(response.data);
        });
        promise.catch((erro)=>{
            alert(erro.response.statusText);
        });
    },[]);

    return(
        <Fundo>
            <div></div>
            <img key={`plano ${id}`} src={plano.image}/>
            <p>{plano.name}</p>
            <h3>Benefícios:</h3>
            <h3>Preço:</h3>
            <h4>R$ {plano.price} cobrados mensalmente</h4>
            <CriaForm>
                <input type="text" placeholder='Nome impresso no cartão'/>
                <input type="text" placeholder='Digitos do cartão'/>
                <input className='input-menor' type="text" placeholder='Código de segurança'/>
                <input className='input-menor' type="text" placeholder='Validade'/>
                <button type='submit'>Assinar</button>

            </CriaForm>
            

            
        </Fundo>
    )
}
export default Plano;

const CriaForm = styled.form`
    display: flex;
    flex-wrap:wrap;
    margin-left: 40px;
    input{
        width: 280px;
        height: 45px;
        border: solid 1px rgba(212, 212, 212, 1);
        padding-left: 11px;
        margin-bottom: 5px;
        border-radius: 5px;
    }
    .input-menor{
        margin-right: 5px;
        width: 130px;
    }
    button{
        margin-top: 10px;
        width: 299px;
        height: 52px;
        left: 40px;
        top: 581px;
        background: #FF4791;
        border-radius: 8px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;

    }`

const Fundo = styled.div`
    width: 375px;
    height: 667px;
    background: black;
    

    div{
        height: 100px;
    }
    img{
        margin-left: 100px;
    }
    
    p{
        margin-left: 100px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
    }
    h3{
        margin-left: 40px;
        margin-top: 20px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;

    }
    h4{
        margin-top: -10px;
        margin-left: 40px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: #FFFFFF;
    }`
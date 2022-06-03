import styled from 'styled-components';
import { useParams,useNavigate } from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';

function Home(){
    
    const navigate = useNavigate();
    const {id} = useParams();
    const {usuario} = useContext(UserContext);
    const [plano, setPlano] = useState([]);

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
            <img key={`plano ${id}`} src={plano.image}/>

        </Fundo>
    )
}
export default Home;

const Fundo = styled.div`
    width: 375px;
    height: 667px;
    background: black;`;
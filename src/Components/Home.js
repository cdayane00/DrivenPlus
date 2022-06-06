import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import usuarioLogo from '../img/usuarioLogo.png'

function Home(){
    
    const navigate = useNavigate();
    const {usuario,setUsuario} = useContext(UserContext);
    const [plano, setPlano] = useState([]);
    const [dadosAssina, setDadosAssina] = useState({membershipId:"", cardName:"", cardNumber:"", securityNumber:"", expirationDate:""});

    useEffect(()=>{
        if(usuario.membership !== null){
            const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${usuario.membership?.id}`;
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
        }
        else{
            const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships`;
            const config = {
                headers: {
                    Authorization: `Bearer ${usuario.token}`,
                },
            };
            
            const promise = axios.post(URL, {
                membershipId: dadosAssina.membershipId,
                cardName: dadosAssina.cardName,
                cardNumber: dadosAssina.cardNumber,
                securityNumber: dadosAssina.securityNumber,
                expirationDate: dadosAssina.expirationDate
            }, config);
            
            promise.then((response)=>{
                console.log("sucesso");
            });
        }

    },[]);

    function cancelarPlano(){
        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions";
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`,
            },
        };
        
        const promise = axios.delete(URL, config);
        
        promise.then((response)=>{
            localStorage.setItem("userdata", JSON.stringify({
                id: response.data.id,
                name: response.data.name,
                cpf: response.data.cpf,
                email: response.data.email,
                password: response.data.password,
                membership: response.data.membership,
                token: response.data.token
            }));
            console.log("sucesso");
            navigate('/subscriptions')
        });
        
        console.log(plano.name)
        promise.catch(erro=>alert(erro.response.statusText)); 
    }

    function atualizaPlano(){
        navigate('/subscriptions');
    }
    return(
        <Fundo>
            <Imagens>
                <img key={`plano ${plano.id}`} src={plano.image}/>
                <img className='logo' src={usuarioLogo}/>
            </Imagens>
            <p>Olá, {usuario.name}</p>
            {plano.perks?.map(brinde =>
                    <a href={brinde.link}>
                        <button>{brinde.title}</button>
                    </a>   
            )}
            <button onClick={atualizaPlano}  className='mudar'>Mudar plano</button>
            <button onClick={cancelarPlano} className='cancelar'>Cancelar plano</button>
        </Fundo>
    )
}
export default Home;

const Imagens = styled.div`
    display: flex;
    flex-wrap: wrap;`

const Fundo = styled.div`
    width: 375px;
    height: 667px;
    background: black;

    img{
        width: 80px;
        height: 50px;
        margin-top: 40px;
        margin-left: 30px;
    }
    .logo{
        width: 30px;
        height: 30px;
        margin-left: 160px;
        margin-top: 30px; 
    }
    p{
        margin-left:75px;
        margin-top:20px;
        margin-bottom: 40px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
    }
    button{
        width: 250px;
        height: 45px;
        margin-left: 38px;
        margin-bottom: 10px;
        border:0;
        background: #FF4791;
        border-radius: 8px;
        justify-content: center;
        align-items: center;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;

    }
    .mudar{
        margin-top: 170px;
        margin-left:-250px;
        position: fixed;
    }
    .cancelar{
        margin-top: 225px;
        margin-left:-250px;
        position: fixed;
        
        
    }`;
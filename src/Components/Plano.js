import styled from 'styled-components';
import { useParams,useNavigate } from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import fechar from '../img/fechar.png'
import voltar from '../img/voltar.png'

function Plano(){
    const navigate = useNavigate();
    const {id} = useParams();
    const {usuario} = useContext(UserContext);
    const [plano, setPlano] = useState([]);
    const [dadosAssina, setDadosAssina] = useState({membershipId:"", cardName:"", cardNumber:"", securityNumber:"", expirationDate:""});
    const [verificaModal, setVerificaModal] = useState(false);

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

    function assinarPlano(event){
        event.preventDefault();

        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions";
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
        
        promise.then(()=>{
            console.log("sucesso");
            modal();
        });
        
        console.log(dadosAssina.cardName)
        console.log(dadosAssina.membershipId)
        console.log(usuario.token);
        promise.catch(erro=>alert(erro.response.statusText));

    }

    function modal(){
        setVerificaModal(true);
    }
    function vaiParaHome(){
        navigate('/home');
    }
    function vaiParaPlanos(){
        navigate('/subscriptions');
    }

    return(
        <Fundo>
            <Topo>
                <img onClick={vaiParaPlanos}  className='div-voltar' src={voltar}/>
                <div className='espaco'>
                    {verificaModal ?(
                        
                        <img onClick={()=> setVerificaModal(false)} className='div-fecha' src={fechar}/>
                    )
                    : <></> }

                </div>
            </Topo>

            {verificaModal ? (
                <div className='fundo'>
                    <div className='div-modal'>  
                        <p className='p-modal'>Tem certeza que deseja assinar o plano {plano.name} (R$ {plano.price})?</p>  
                        <button onClick={()=> setVerificaModal(false)} className='nao'>Não</button>
                        <button onClick={vaiParaHome} className='sim'>Sim</button>
                    </div>
                </div>  
            )
            :
                <></>  
            }
            
            <img key={`plano ${id}`} src={plano.image}/>
            <p>{plano.name}</p>
            <h3>Benefícios:</h3>
            <h3>Preço:</h3>
            <h4>R$ {plano.price} cobrados mensalmente</h4>
            <CriaForm onSubmit={assinarPlano}>
                <input type="text" placeholder='Nome impresso no cartão' value={dadosAssina.cardName} required onChange={e=> setDadosAssina({...dadosAssina, membershipId: id, cardName: e.target.value})}/>
                <input type="number" placeholder='Digitos do cartão' value={dadosAssina.cardNumber} required onChange={e=> setDadosAssina({...dadosAssina, cardNumber: e.target.value})}/>
                <input className='input-menor' type="text" placeholder='Código de segurança' value={dadosAssina.securityNumber} required onChange={e=> setDadosAssina({...dadosAssina, securityNumber: e.target.value})}/>
                <input className='input-menor' type="date" placeholder='Validade' value={dadosAssina.expirationDate} required onChange={e=> setDadosAssina({...dadosAssina, expirationDate: e.target.value})}/>
                <button type='submit'>Assinar</button>

            </CriaForm>
            

            
        </Fundo>
    )
}
export default Plano;

const Topo = styled.div`
    display:flex;`;

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
    

    .div-modal{
        width: 248px;
        height: 210px;
        background: #FFFFFF;
        border-radius: 12px;
        position: fixed;
        margin-left: 50px;
        margin-top: 180px;
        display: flex;
        flex-wrap: wrap;
    }
    .div-modal button{
        width: 95px;
        height: 52px;
        margin-left: 18px;
        border-radius: 8px;
        border: 0;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
    .sim{
        background: #FF4791;
    }
    .nao{
        background: #CECECE;
    }
    .div-fecha{
        margin-left: 250px;
        margin-top: 20px;
    }
    .fundo{
        width: 375px;
        height: 667px;
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
    }
    .div-voltar{
        margin-left: 30px;
        margin-top: 20px; 
        height:30px;

    }
    .p-modal{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #000000;
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 30px;
    }
    

    .espaco{
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
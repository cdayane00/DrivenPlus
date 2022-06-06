import styled from 'styled-components';
import {useParams,useNavigate} from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import voltar from '../img/voltar.png'

function TelaUsuario(){
    const navigate = useNavigate();
    const {usuario} = useContext(UserContext);




    return(
        <Fundo>
            <img className='div-voltar' src={voltar}/>
            <div className='espaco'>
            </div>
            <button type='submit'>Assinar</button>
            

            
        </Fundo>
    )

}

export default TelaUsuario();

const Fundo = styled.div`
    width: 375px;
    height: 800px;
    background: black;`
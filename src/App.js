import { Routes, Route} from 'react-router-dom';
import Login from './Components/Login';
import Cadastro from './Components/Cadastro';
import Plano from './Components/Plano';
import Planos from './Components/Planos';
import Home from './Components/Home';
import UserContext from './context/UserContext';
import { useState } from 'react';

function App(){
    const [usuario, setUsuario] = useState(
        localStorage.getItem('userdata')
        ? JSON.parse(localStorage.getItem('userdata'))
        : null
    );
    const [init, setInit] = useState(false);
    const [plano, setPlano] = useState([]);
    return(
        <UserContext.Provider value={{usuario, setUsuario, plano, setPlano}}>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/sign-up' element={<Cadastro/>}/>
                <Route path='/subscriptions' element={!init ? <Planos setInit={setInit}/> : <Plano/>}/>
                <Route path='/subscriptions/:id' element={<Plano/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>

        </UserContext.Provider>
            
       
    )
}
export default App;
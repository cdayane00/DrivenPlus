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
    return(
        <UserContext.Provider value={{usuario}}>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/sign-up' element={<Cadastro/>}/>
                <Route path='/subscriptions' element={<Planos/>}/>
                <Route path='/subscriptions/:id' element={<Plano/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>

        </UserContext.Provider>
            
       
    )
}
export default App;
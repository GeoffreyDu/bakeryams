import { Routes, Route } from 'react-router-dom'
import { Game } from './components/Game.jsx'
import { Signin } from './components/Signin.jsx'
import { Login } from './components/Login.jsx'
import { Navbar } from './components/Navbar.jsx'
import { NavbarLogged } from './components/NavbarLogged.jsx'
import { PrivateRoute } from './components/PrivateRoute.jsx'
import { useLogin } from './provider/LoginProvider.jsx'
import { Home } from './components/Home.jsx'
import { Prices } from './components/Prices.jsx'
import './App.css'

function App() {
  const { isLogged } = useLogin()
  
  return (
    <div className="App">
      { isLogged ? <NavbarLogged/> : <Navbar/> }
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/signin' element={ <Signin/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/game' element={ <PrivateRoute><Game/></PrivateRoute> } />
        <Route path='/prices' element={ <PrivateRoute><Prices/></PrivateRoute> } />
      </Routes>
    </div>
  );
}

export default App;

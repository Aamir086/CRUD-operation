import React, { createContext, useReducer } from 'react'
import { initialState, reducer } from './components/reducer/UseReducer';
import './App.css';
import Navbar from './components/Navbar'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import ErrorPage from './ErrorPage';
import 'bootstrap/dist/css/bootstrap.css';
import Logout from './components/Logout';


// using contextAPI
export const userContext = createContext()

const Routing = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/logout' element={<Logout />} />
      <Route element={<ErrorPage />} />
    </Routes>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (<>

    <userContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Routing />
    </userContext.Provider>
  </>
  )
}

export default App
import React,{useState} from 'react'
import { Routes,Route } from 'react-router-dom'
import Auth from './Auth/Auth'
import Nav from './components/Nav'
import Home from './pages/Home'

const App = () => {
    const [muser, setMuser] = useState('');

  return (
    <>
    <Nav muser={muser} setMuser={setMuser}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth setMuser={setMuser} />} />

      </Routes>
    </>
  )
}

export default App
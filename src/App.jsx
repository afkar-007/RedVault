import { useState } from 'react'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Home from './pages/Home'
import AddTransaction from './pages/AddTransaction'
import ManageExpense from './pages/ManageExpense'
import Notes from './pages/Notes'

import Expenses from './pages/Expenses'
import Incomes from './pages/Incomes'
import AddNote from './pages/AddNote'
import ManageIncomes from './pages/ManageIncomes'

import NoteView from './pages/NoteView'
import EditNote from './pages/EditNote'

import Profile from './pages/Profile'
import About from './pages/About'


import ScrollToTop from './components/TopToScroll'


import { Route,Routes } from 'react-router-dom'
function App() {
  

  return (
    <>
    <ScrollToTop/>

    <Routes>

      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Landing/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/AddTransaction/:type' element={<AddTransaction/>}/>

      <Route path='/Expenses' element={<Expenses/>}/>
      <Route path='/incomes' element={<Incomes/>}/>


      <Route path='/ManageExpense/:id' element={<ManageExpense/>}/>
      <Route path='/ManageIncomes/:id' element={<ManageIncomes/>}/>
      <Route path='/notes' element={<Notes/>}/>
      <Route path='/addNote' element={<AddNote/>}/>

      <Route path='/viewNote/:id' element={<NoteView/>}/>
      <Route path='/manageNote/:id' element={<EditNote/>}/>

      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<About/>}/>


    </Routes>
      
    </>
  )
}

export default App

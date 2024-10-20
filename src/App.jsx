import { useState } from 'react'
import './App.css';
import {Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import BillingForm from './components/billingform';


function App() {

  return (
   <div className='App d-flex flex-column align-items-center justify-content-center w-100'>
      <Container>
         <BillingForm/>
      </Container>
   </div>
  )
}

export default App

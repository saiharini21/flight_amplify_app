import React, { useState, useEffect } from 'react';
import './App.css';
import  { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { createFlight as createFlightMutation } from './graphql/mutations';
import {
  Link
} from "react-router-dom";
const initialFormState = { name: '', price:0 ,to:'',from:'',time:'',date:'' }

function Form() {
  const [formData, setFormData] = useState(initialFormState);

  async function createFlight() {
    if (!formData.name || !formData.to || !formData.price||!formData.time||!formData.date) return;
    await API.graphql({ query: createFlightMutation, variables: { input: formData } });
    setFormData(initialFormState);
  }



  return (
    <div className="form">
      <h1 className='title'>Add Flights</h1>
      <div className='form-data'>

      <label htmlFor="name" className='label mt-3'>Name :</label>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Flight name"
        value={formData.name}
        name="name"
      />
       <label htmlFor="price" className='label mt-3'>Price :</label>
      <input
        onChange={e => setFormData({ ...formData, 'price': e.target.value})}
        placeholder="Flight price"
        value={formData.price}
        name="price"
      />
         <label htmlFor="to" className='label mt-3'>Destination :</label>
         <input
        onChange={e => setFormData({ ...formData, 'to': e.target.value})}
        placeholder="Flight to"
        value={formData.to}
        name='to'
      />
      <label htmlFor="from" className='label mt-3'>Start :</label>
        <input
        onChange={e => setFormData({ ...formData, 'from': e.target.value})}
        placeholder="Flight from"
        value={formData.from}
        name="from"
      />
      <label htmlFor="date" className='label mt-3'>Date :</label>
        <input
        onChange={e => setFormData({ ...formData, 'date': e.target.value})}
        placeholder="Flight date"
        value={formData.date}
        name="date"
      />
      <label htmlFor="time" className='label mt-3'>Time :</label>
        <input
        onChange={e => setFormData({ ...formData,'time':e.target.value})}
        placeholder="Flight time"
        value={formData.time}
        name="time"
      />
     <button onClick={createFlight}  className='btn btn-primary submit'>Create Flight</button>
       </div>
       <Link to="/display" className='btn btn-primary submit mt-2'> Details</Link>
  
    </div>
  );
}

export default (Form);
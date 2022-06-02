import React, { useState, useEffect } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import  { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listFlights } from './graphql/queries';
import awsconfig from './aws-exports';
import { createFlight as createFlightMutation,updateFlight as updateFlightMutation, deleteFlight as deleteFlightMutation } from './graphql/mutations';

Amplify.configure(awsconfig);
const initialFormState = { name: '', price:0 ,to:'',from:'',time:'',date:'' }
const initialedit = {id:'', name: '', price:0 ,to:'',from:'',time:'',date:'' }

function Form() {
  const [flights, setFlight] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [edit,setEdit]=useState(initialedit);
  const [isedit,setIsedit]=useState(0);
  useEffect(() => {
    fetchFlights();
  }, [edit]);

  async function fetchFlights() {
    const apiData = await API.graphql(graphqlOperation(listFlights));
    const flightList=(apiData.data.listFlights.items);
    console.log(flightList);
    setFlight(flightList);
  }
  async function createFlight() {
    if (!formData.name || !formData.to || !formData.price||!formData.time||!formData.date) return;
    await API.graphql({ query: createFlightMutation, variables: { input: formData } });
    setFlight([ ...flights, formData ]);
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
  
    </div>
  );
}

export default (Form);
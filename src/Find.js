import React, { useState, useEffect } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import  { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listFlights } from './graphql/queries';
import { createFlight as createFlightMutation,updateFlight as updateFlightMutation, deleteFlight as deleteFlightMutation } from './graphql/mutations';

const initialFormState = { name: '', price:0 ,to:'',from:'',time:'',date:'' }
const initialedit = {id:'', name: '', price:0 ,to:'',from:'',time:'',date:'' }

function Find() {
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
  async function updateFlight() {
    if (!edit.name || !edit.to || !edit.price||!edit.time||!edit.date) return;
   console.log(edit);
    await API.graphql({ query: updateFlightMutation, variables: { input: edit } });
    setFormData(initialFormState);
    setEdit(initialedit);

    setIsedit(0);

  }
  function displayFlight({id}) {
     const  currFlight=flights.filter(flight => flight.id===id);
     setEdit({'id':currFlight[0].id,'name': currFlight[0].name, 'price':currFlight[0].price ,'to':currFlight[0].to ,'from':currFlight[0].from ,'time':currFlight[0].time ,'date':currFlight[0].date})
      setIsedit(1);

    }
  async function deleteFlight({ id }) {
    const newFlightArray = flights.filter(flight => flight.id !== id);
    setFlight(newFlightArray);
    
    await API.graphql({ query: deleteFlightMutation, variables: { input: { id } }});
  }

  return (
    <div className="container">
      <h1 className='title mt-4 mb-2'>Flight Details</h1>
      <div className='find'>
      <label htmlFor="name" className='ms-4 label me-1'>Name :</label>
      <input
        onChange={e => setEdit({ ...edit, 'name': e.target.value})}
        placeholder="Flight name"
        value={edit.name}
        style={{width:'40%',margin:"1rem 0.4rem"}}
        name="name"
      />
   
   <label htmlFor="price" className=' ms-4 label me-2'>Price :</label>
      <input
        onChange={e => setEdit({ ...edit, 'price': e.target.value})}
        placeholder="Flight price"
        value={edit.price}
        style={{width:'40%',margin:"1rem 0.4rem"}}
        name="price"

      />
       <label htmlFor="to" className='label me-1'>Destination :</label>
         <input
        onChange={e => setEdit({ ...edit, 'to': e.target.value})}
        placeholder="Flight to"
        value={edit.to}
        style={{width:'40%',margin:"1rem 0.4rem"}}
        name="to"

      />
 <label htmlFor="from" className='label me-1'>Start :</label>
        <input
        onChange={e => setEdit({ ...edit, 'from': e.target.value})}
        placeholder="Flight from"
        value={edit.from}
        style={{width:'40%',margin:"1rem 0.4rem"}}

      />
       <label htmlFor="date" className='ms-4 label me-1 '>Date :</label>
        <input
        onChange={e => setEdit({ ...edit, 'date': e.target.value})}
        placeholder="Flight date"
        value={edit.date}
        style={{width:'40%',margin:"1rem 0.4rem"}}

      />
       <label htmlFor="time" className='ms-4 label me-1'>Time :</label>
        <input
        onChange={e => setEdit({ ...edit,'time':e.target.value})}
        placeholder="Flight time"
        value={edit.time}
        style={{width:'40%',margin:"1rem 0.4rem"}}

      />
      <div className='button-grp justify-content-center'>
      <button className='btn btn-primary page2 ' onClick={updateFlight}>Update Flight</button>
      </div>
   
 </div>
        <div className='disp-container'>
            <div className='row'>
             {
          flights.map(flight => (
            <div key={flight.id} className='card col-lg-6 col-12'>
            <h2 className='disp-data'><span className='disp-label me-5'>Name: </span> {flight.name}</h2>
            <h2 className='disp-data'><span className='disp-label me-5'>Price: </span> {flight.price}</h2>
            <h2 className='disp-data'><span className='disp-label me-5'>Start: </span> {flight.from}</h2>
            <h2 className='disp-data'><span className='disp-label me-3'>Destination:</span> {flight.to}</h2>
            <h2 className='disp-data'><span className='disp-label me-5'>Date: </span> {flight.date}</h2>
            <h2 className='disp-data'><span className='disp-label me-5'>Time: </span> {flight.time}</h2>
             <div className='button-grp'>
              <button  className='btn btn-primary page2' onClick={() => displayFlight(flight)}>Edit flight</button>
              <button  className='btn btn-primary page2' onClick={() => deleteFlight(flight)}>Delete flight</button>
            </div>
          </div>
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default (Find);
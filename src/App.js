import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Hello, React + Tailwind!</h1>
      <p>
        This is a <code>code</code> example.
      </p>
      <h1> This is your mum</h1>
    </div>
  );
}

function searchBar() {

}

function productTable(json_info) {

  const [ info, setInfo ] = useState()
  for (int i = 0; i < json_info.length; i++) {

  }
  return (
    <>
      <div className='flex-container'>
        <div className='item'>Name</div>
        <div className='item'>Price</div>
      </div>
      <SubTable values={json_info[0]}> </SubTable>
    </>
  );
}

function SubTable() {
  return ();
}



export default App;

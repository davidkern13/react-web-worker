import React, { useEffect, useState } from 'react';

import worker from './worker';
import WebWorker from './workerSetup';

import { CALL_API } from './enums';

function App() {

  let [list, setList] = useState([]);
  let [value, setValue] = useState();

  let ApiWorker = new WebWorker(worker);

  useEffect( () => {
    ApiWorker.addEventListener('message', event => {
      const { data } = event;
      setList(data);
    });
  });

  const onHandleChange = e => {
    let { value } = e.target;

    setValue(value);
  }

  const onHandleSubmit = e => {
    e.preventDefault();

    console.log('value', value);

    ApiWorker.postMessage(value);
  }

  return (
    <div className="App">

        <div className={'search-input'}>
            <p>type me, info, com</p>
            <form onSubmit={onHandleSubmit}>
                <input type={'text'} onChange={onHandleChange} />
                <input type={'submit'} />
            </form>
        </div>

        <div>
        <ul>
            {list && list.map( (item, idx) => {
                return (
                    <li key={idx+item.email}>{item.email}</li>
                )
            })}
        </ul>
        </div>
    </div>
  );
}

export default App;

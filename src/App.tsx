import React, { useEffect, useState } from 'react';
import './App.css';

import Table from './components/Table'
import Form from './components/Form'

interface LogProp {
  time: number;
  work: string;
  date: string;
}

function App() {
  const [data, setData] = useState<LogProp[]>();
  const [hours, setHours] = useState(0);

  const reducer = (accumulator:number, currentValue:number) => accumulator + currentValue;

  useEffect(() => {
    let worklogs = localStorage.getItem('@WorkLogData')
    if(worklogs !== 'undefined'){
      if(worklogs !== null){
        setData(JSON.parse(worklogs))
      }
    }
  }, []);

  useEffect(() => {
    const times = data?.map(works => {
      return works.time
    })
    if(times?.length){
      setHours(times?.reduce(reducer) || 0);
    }
  }, [data])

  function handleRemove(e: any, idx: number) {
    e.preventDefault()
    
    if(data?.length == 1){
      setHours(0)
    }

    if (data){
      let copy = [...data];
      copy.splice(idx, 1);
      setData(copy);
      localStorage.setItem('@WorkLogData', JSON.stringify(copy))
    }
  }

  return (
    <div className="App">
      <header>
        <h1>
          Workout Log 
        </h1>
      </header>
      <div className="container" style={{flexDirection: 'column'}}>
        <Form data={data} setData={setData}/>
        <Table data={data} handleRemove={handleRemove} />
        <h2>
          {hours} Hours of exercices! 
        </h2>
      </div>
    </div>
  );
}

export default App;

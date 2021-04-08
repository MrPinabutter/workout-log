import React, { useEffect, useState } from 'react';
import './App.css';

interface LogProp {
  time: number;
  work: string;
  date: string;
}

function App() {
  const [time, setTime] = useState(0);
  const [work, setWork] = useState('Run');
  const [date, setDate] = useState('');

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
    setHours(times?.reduce(reducer) || 0);
    
  }, [data])

  function handleSaveLog(e: any, log: LogProp) {
    e.preventDefault()
    if (data){
      setData([...data, log])
    }else{
      setData([log])
    }
    console.log(data);
    localStorage.setItem('@WorkLogData', JSON.stringify(data))
  }

  function handleRemove(e: any, idx: number) {
    e.preventDefault()
    if (data){
      let copy = [...data];
      copy.splice(idx, 1);
      setData(copy);
    }else{
      setData([])
    }
    localStorage.setItem('@WorkLogData', JSON.stringify(data))
  }

  return (
    <div className="App">
      <header>
        <h1>
          Workout Log 
        </h1>
      </header>
      <div className="container" style={{flexDirection: 'column'}}>
        <label htmlFor="form">Insert an item</label>
        <form>
          <div>
            <input type="number" id="time" placeholder="Time spent" value={time} onChange={e => setTime(Number(e.target.value))}/>
            <select name="works" value={work} onChange={e => setWork(e.target.value)} id="work">
              <option value="Run">Run</option>
              <option value="Swimming">Swimming</option>
              <option value="Bike">Bike</option>
            </select>
          </div>

          <div>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="date-input" name="date"/>
            <button className="add" type="submit" onClick={e => handleSaveLog(e, {time, work, date})}>Add</button>
          </div>
        </form>
        <div className="table-container">
          <table >
            <thead>
              <th>Time</th>
              <th>Type</th>
              <th>Date</th>
              <th>Remove</th>
            </thead>

            <tbody>
            {data && data.map((log, idx) => (
                <tr key={`${idx}`}>
                  <td>{`${log.time}hr`}</td>
                  <td>{`${log.work}`}</td>
                  <td>{`${log.date}`}</td>
                  <td id="button-table-container">
                    <button className="remove-button" onClick={e => handleRemove(e, idx)}>-</button>
                    </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <h2>
          {hours} Hours of exercice! 
        </h2>
      </div>
    </div>
  );
}

export default App;

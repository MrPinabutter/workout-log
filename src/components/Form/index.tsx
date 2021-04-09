import React, { useState } from 'react';

import './styles.css'

interface FormProps {
  data: LogProp[] | undefined;
  setData: Function;
} 

interface LogProp {
  time: number;
  work: string;
  date: string;
}

export default function Form({data, setData}: FormProps) {
  const [time, setTime] = useState(0);
  const [work, setWork] = useState('Run');
  const [date, setDate] = useState('');


  function handleSaveLog(e: any, log: LogProp) {
    e.preventDefault();
    
    if(!log.date){
      alert('You must provide a valid date!');
      return;
    };

    if(log.time <= 0){
      alert('You must provide a time bigger than zero');
      return;
    }
    
    if (data){
      setData([...data, log])
    }else{
      setData([log])
    }
    
    localStorage.setItem('@WorkLogData', JSON.stringify(data))
  }

  return (
    <>
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
    </>
  );
}
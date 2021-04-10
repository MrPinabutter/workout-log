import React, { useState } from 'react';

import './styles.css'

interface FormProps {
  data: LogProp[] | undefined;
  setData: Function;
} 

interface LogProp {
  workoutTime: number;
  workoutActivities: string;
  workouDate: string;
}

export default function Form({data, setData}: FormProps) {
  const [workoutTime, setWorkoutTime] = useState(1);
  const [workoutActivities, setWorkoutActivities] = useState('Run');
  const [workouDate, setWorkoutDate] = useState('');


  function handleSaveLog(e: any, log: LogProp) {
    e.preventDefault();
    
    if(!log.workouDate){
      alert('You must provide a valid date!');
      return;
    };

    const formatDate = new Date(log.workouDate)
    log.workouDate = `${formatDate.getDate()+1}/${formatDate.getMonth()+1}/${formatDate.getFullYear()}` 

    if(log.workoutTime <= 0){
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
          <input min={1} type="number" id="time" placeholder="Time spent" value={workoutTime} onChange={e => setWorkoutTime(Number(e.target.value))}/>
          <select name="works" value={workoutActivities} onChange={e => setWorkoutActivities(e.target.value)} id="work">
            <option value="Run">Run</option>
            <option value="Swimming">Swimming</option>
            <option value="Bike">Bike</option>
          </select>
        </div>

        <div>
          <input type="date" value={workouDate} onChange={e => setWorkoutDate(e.target.value)} className="date-input" name="date"/>
          <button className="add" type="submit" onClick={e => handleSaveLog(e, {workoutTime, workoutActivities, workouDate})}>Add</button>
        </div>
      </form>
    </>
  );
}
import React, { useState } from 'react';
import './App.css';

function App() {
  const [date, setDate] = useState('');

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
            <input type="number" id="time" placeholder="Time spent" value={date} onChange={(e) => setDate(e.target.value)}/>
            <select name="works" id="work">
              <option value="run">Run</option>
              <option value="swimming">Swimming</option>
              <option value="mercedes">Bike</option>
            </select>
          </div>

          <div>
            <input type="date" className="date-input" name="date"/>
            <button className="add" type="submit" onClick={(e) => e.preventDefault()}>Add</button>
          </div>
        </form>
        <hr style={{height:4, color: 'black'}}></hr>
      </div>
    </div>
  );
}

export default App;

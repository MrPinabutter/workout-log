import React from 'react';
import RemoveButton from '../RemoveButton';

import './styles.css';

interface LogProp {
  workoutTime: number;
  workoutActivities: string;
  workouDate: string;
}

interface TableProps {
  data: LogProp[] | undefined;
  handleRemove: Function;
};

export default function Table({data, handleRemove}: TableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <th>Time</th>
          <th>Type</th>
          <th>Date</th>
          <th className="thead-center">Remove</th>
        </thead>

        <tbody>
        {data && data.map((log, idx) => (
            <tr key={`${idx}`}>
              <td>{`${log.workoutTime}hr`}</td>
              <td>{`${log.workoutActivities}`}</td>
              <td>{`${log.workouDate}`}</td>
              <td id="button-table-container">
                <RemoveButton handleRemove={handleRemove} idx={idx} />
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
import React from 'react';
import RemoveButton from '../RemoveButton';

import './styles.css';

interface LogProp {
  time: number;
  work: string;
  date: string;
};

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
          <th>Remove</th>
        </thead>

        <tbody>
        {data && data.map((log, idx) => (
            <tr key={`${idx}`}>
              <td>{`${log.time}hr`}</td>
              <td>{`${log.work}`}</td>
              <td>{`${log.date}`}</td>
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
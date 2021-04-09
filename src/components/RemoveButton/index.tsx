import React from 'react';

import './styles.css';

interface ButtonProp {
  handleRemove: Function;
  idx: number
}

export default function RemoveButton({handleRemove, idx}: ButtonProp) {
  return (
    <button className="remove-button" onClick={e => handleRemove(e, idx)}>
      -
    </button>
  )
}
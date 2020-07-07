import React from 'react';

const Slider = ({ label, name, onChange, value, min=0, max=10000}) => {
  return (
    <div className='setting'>
      <div>{label}: </div>
      <input
        className='slider'
        name={name}
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      <span>{value / 1000} s</span>
    </div>
  );
};

export default Slider;
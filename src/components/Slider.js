import React from 'react';

const Slider = ({ label, name, onChange, value, min=0, max=10000}) => {
  return (
    <div className='setting'>
      <label className="label" htmlFor={name}>{label} </label><br/>
      <input
        id={name}
        className='slider'
        name={name}
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      <div className='duration'>{value / 1000} s</div>
    </div>
  );
};

export default Slider;
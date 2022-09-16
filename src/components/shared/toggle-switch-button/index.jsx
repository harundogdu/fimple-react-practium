import React from 'react';

const ToggleSwitchButton = ({ name, onChange, value }) => {
  return (
    <div className='toggle-switch'>
      <input
        type='checkbox'
        className='toggle-switch-checkbox'
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      />
      <label className='toggle-switch-label' htmlFor={name}>
        <span className='toggle-switch-inner'  data-dark='☀️'  data-light='🌙' /> 
        <span className='toggle-switch-switch' />
      </label>
    </div>
  );
};

export default ToggleSwitchButton;

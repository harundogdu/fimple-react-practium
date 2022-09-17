import React from 'react';
import PropTypes from 'prop-types';

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
        <span className='toggle-switch-inner' data-dark='☀️' data-light='🌙' />
        <span className='toggle-switch-switch' />
      </label>
    </div>
  );
};

ToggleSwitchButton.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
};

ToggleSwitchButton.defaultProps = {
  name: 'toggle-switch',
  onChange: () => {},
  value: false
};

export default ToggleSwitchButton;

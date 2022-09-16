import React from 'react'

const SelectField = ({ label, name, value, onChange, options }) => (
    <div className='form-field'>
        <label className='form-field__label' htmlFor={name}>
            {label}
        </label>
        <select
            className='form-field__input'
            id={name}
            name={name}
            value={value}
            onChange={onChange}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
)

export default SelectField
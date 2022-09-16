import PropTypes from 'prop-types';

export default function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className='form-field'>
      <label className='form-field__label' htmlFor={name}>
        {label}
      </label>
      <select
        className='form-field__select'
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
  );
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

SelectField.defaultProps = {
  label: '',
  name: '',
  value: '',
  onChange: () => {},
  options: []
};

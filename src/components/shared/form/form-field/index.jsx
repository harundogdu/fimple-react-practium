import PropTypes from 'prop-types';

export default function FormField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  ...rest
}) {
  return (
    <div className='form-field'>
      <label className='form-field__label' htmlFor={id}>
        {label}
      </label>
      <input
        className='form-field__input'
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

FormField.defaultProps = {
  placeholder: '',
  value: ''
};

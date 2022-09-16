export default function FormField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error
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
        onBlur={onBlur}
      />
      {error && <p className='form-field__error'>{error}</p>}
    </div>
  );
}

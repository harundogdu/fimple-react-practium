export default function FormButton({ label, type, onClick }) {
  return (
    <button className='form-field__button' type={type} onClick={onClick}>
      {label}
    </button>
  );
}

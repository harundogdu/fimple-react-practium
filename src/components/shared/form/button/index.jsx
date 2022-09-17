import PropTypes from 'prop-types';

export default function FormButton({ label, type, onClick }) {
  return (
    <button className='form-field__button' type={type} onClick={onClick}>
      {label}
    </button>
  );
}

FormButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

FormButton.defaultProps = {
  label: 'Submit',
  type: 'submit',
  onClick: () => {}
};

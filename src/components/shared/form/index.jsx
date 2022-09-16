const FormRow = ({ children }) => {
  return <div className='form__row'>{children}</div>;
};

const FormColumn = ({ children }) => {
  return <div className='form__column'>{children}</div>;
};

const FormGroup = ({ children }) => {
  return <div className='form__group'>{children}</div>;
};

export default function Form({ children, onSubmit }) {

  const handleSubmit = event => {
    event.preventDefault();
  };


  return (
    <form className='form' onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

export { FormRow, FormColumn, FormGroup };

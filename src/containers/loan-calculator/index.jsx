import {
  Form,
  FormButton,
  FormColumn,
  FormField,
  FormGroup,
  FormRow,
  SelectField
} from 'components';

export default function LoanCalculatorForm() {
  const handleLoanFormSubmit = event => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className='loan-calculator'>
      <h1 className='loan-calculator__title'>Loan Calculator</h1>
      <Form onSubmit={handleLoanFormSubmit}>
        <FormRow>
          <FormColumn>
            <FormGroup>
              <FormField
                label='Loan Amount'
                type='number'
                id='loanAmount'
                placeholder='Enter loan amount'
              />
            </FormGroup>
            <FormGroup>
              <FormField
                label='Loan Term'
                type='number'
                id='loanTerm'
                placeholder='Enter loan term'
              />
            </FormGroup>
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <FormGroup>
              <SelectField
                label='Loan Type'
                name='loanType'
                options={[
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'yearly', label: 'Yearly' }
                ]}
                id='loanType'
              />
            </FormGroup>
            <FormGroup>
              <FormField
                label='Interest Rate'
                type='number'
                id='interestRate'
                placeholder='Enter interest rate'
              />
            </FormGroup>
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <FormGroup>
              <SelectField
                name='taxType'
                label='Tax Type'
                id='taxType'
                options={[
                  { value: 'bsmv', label: 'BSMV' },
                  { value: 'kkdf', label: 'KKDF' }
                ]}
              />
            </FormGroup>
            <FormGroup>
              <FormField
                label='Tax Rate'
                type='number'
                id='taxRate'
                placeholder='Enter tax rate'
              />
            </FormGroup>
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <FormButton label='Calculate' type='submit' />
          </FormColumn>
        </FormRow>
      </Form>
    </div>
  );
}

import {
  Form,
  FormButton,
  FormColumn,
  FormField,
  FormGroup,
  FormRow,
  SelectField
} from 'components';
import { useLoanFields } from 'contexts';

export default function LoanCalculatorForm() {
  const { loanState, updateLoanState, calculateLoan } = useLoanFields();

  const handleLoanFormSubmit = event => {
    event.preventDefault();

    const obj = calculateLoan();
    console.log(obj);
  };

  const handleLoanFormChange = event => {
    const { name, value } = event.target;
    updateLoanState(name, value);
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
                type='text'
                id='loanAmount'
                placeholder='Enter loan amount'
                name='loanAmount'
                value={loanState.loanAmount}
                onChange={handleLoanFormChange}
                pattern='[0-9]*'
                required
                min='0'
              />
            </FormGroup>
            <FormGroup>
              <FormField
                label='Loan Term'
                type='text'
                id='loanTerm'
                placeholder='Enter loan term'
                name='loanTerm'
                value={loanState.loanTerm}
                onChange={handleLoanFormChange}
                pattern='[0-9]*'
                required
                min='0'
              />
            </FormGroup>
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <FormGroup>
              <SelectField
                id='loanType'
                name='loanType'
                label='Loan Type'
                options={[
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'yearly', label: 'Yearly' }
                ]}
                value={loanState.loanType}
                onChange={handleLoanFormChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormField
                id='interestRate'
                name='interestRate'
                label='Interest Rate'
                type='text'
                placeholder='Enter interest rate'
                value={loanState.interestRate}
                onChange={handleLoanFormChange}
                required
                min='0'
              />
            </FormGroup>
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <FormGroup>
              <SelectField
                id='taxBSMVRate'
                name='taxBSMVRate'
                label='Tax BSMV'
                options={[{ value: 'bsmv', label: 'BSMV' }]}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormField
                id='taxBSMVRate'
                name='taxBSMVRate'
                label='Tax BSMV Rate'
                type='text'
                placeholder='Enter tax BSMV rate'
                value={loanState.taxBSMVRate}
                onChange={handleLoanFormChange}
                required
                min='0'
              />
            </FormGroup>
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <FormGroup>
              <SelectField
                id='taxKKDFRate'
                name='taxKKDFRate'
                label='Tax KKDF'
                options={[{ value: 'kkdf', label: 'KKDF' }]}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormField
                id='taxKKDFRate'
                name='taxKKDFRate'
                label='Tax KKDF Rate'
                type='text'
                placeholder='Enter tax KKDF rate'
                value={loanState.taxKKDFRate}
                onChange={handleLoanFormChange}
                required
                min='0'
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

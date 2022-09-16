import { createContext, useState, useContext } from 'react';

const initialState = {
  loanAmount: 0,
  loanTerm: 0,
  loanType: 'weekly',
  interestRate: 0,
  taxType: 'bsmv',
  taxRate: 0
};

const LoanFieldsContext = createContext(initialState);

const LoanFieldsProvider = ({ children }) => {
  const [loanState, setLoanState] = useState(initialState);

  const updateLoanState = (field, value) => {
    setLoanState({ ...loanState, [field]: value });
  };

  const value = { loanState, updateLoanState };

  return (
    <LoanFieldsContext.Provider value={value}>
      {children}
    </LoanFieldsContext.Provider>
  );
};

export const useLoanFields = () => {
  const context = useContext(LoanFieldsContext);

  if (!context) {
    throw new Error('useLoanFields must be used within a LoanFieldsProvider');
  }

  return context;
};

export default LoanFieldsProvider;

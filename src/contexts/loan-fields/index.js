import { createContext, useState, useContext } from 'react';
import { moneyFormat } from 'utils';

const initialState = {
  loanAmount: 100000,
  loanTerm: 12,
  loanType: 'monthly',
  interestRate: 2.28,
  taxBSMVRate: 0.1,
  taxKKDFRate: 0.15
};

const LoanFieldsContext = createContext(initialState);

const LoanFieldsProvider = ({ children }) => {
  const [loanState, setLoanState] = useState(initialState);

  const updateLoanState = (field, value) => {
    setLoanState({ ...loanState, [field]: value });
  };

  const loanTypeConvertToDay = type => {
    switch (type) {
      case 'weekly':
        return 7;
      case 'yearly':
        return 365;
      case 'monthly':
      default:
        return 30;
    }
  };

  const calculateLoan = () => {
    const { loanAmount, loanTerm, loanType, interestRate } = loanState;

    let loan = [];
    let remainingLoanTerm = loanTerm;
    let remainingLoanAmount = loanAmount;
    const loanTypeDay = loanTypeConvertToDay(loanType);

    while (remainingLoanTerm > 0) {
      const compoundPayment = parseFloat(
        remainingLoanAmount *
          Math.pow(1 + interestRate / 100, loanTypeDay / 30) -
          remainingLoanAmount
      );
      const KKDFPayment = parseFloat(compoundPayment * loanState.taxKKDFRate);
      const BSMVPayment = parseFloat(compoundPayment * loanState.taxBSMVRate);
      const rateLast = parseFloat(
        Number(
          interestRate / 100 +
            KKDFPayment / remainingLoanAmount +
            BSMVPayment / remainingLoanAmount
        ).toFixed(4)
      );
      const montlyPayment = parseFloat(
        loanAmount *
          ((rateLast * (1 + rateLast) ** loanTerm) /
            ((1 + rateLast) ** loanTerm - 1))
      );
      const principalPayment = parseFloat(
        montlyPayment - (compoundPayment + KKDFPayment + BSMVPayment)
      );

      remainingLoanAmount = parseFloat(remainingLoanAmount - principalPayment);

      loan.push({
        loanTerm: moneyFormat(loanTerm),
        montlyPayment: moneyFormat(montlyPayment),
        principalPayment: moneyFormat(principalPayment),
        remainingLoanAmount: moneyFormat(remainingLoanAmount),
        compoundPayment: moneyFormat(compoundPayment),
        KKDFPayment: moneyFormat(KKDFPayment),
        BSMVPayment: moneyFormat(BSMVPayment)
      });

      remainingLoanTerm--;
    }

    return {
      loan
    };
  };

  const value = { loanState, updateLoanState, calculateLoan };

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

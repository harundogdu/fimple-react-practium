import { createContext, useState, useContext } from 'react';
import { moneyFormat } from 'utils';

const initialState = {
  loanAmount: 100000,
  loanTerm: 12,
  loanType: 'monthly',
  interestRate: 2.28,
  taxBSMVRate: 10,
  taxKKDFRate: 15
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

    const loan = [];
    const loanTypeDay = loanTypeConvertToDay(loanType);
    let remainingLoanTerm = loanTerm;
    let remainingPrincipalAmount = loanAmount;

    while (remainingLoanTerm > 0) {
      const profitAmount = parseFloat(
        remainingPrincipalAmount *
          Math.pow(1 + interestRate / 100, loanTypeDay / 30) -
          remainingPrincipalAmount
      );
      const kkdfAmount = parseFloat(
        (profitAmount * loanState.taxKKDFRate) / 100
      );
      const bsmvAmount = parseFloat(
        (profitAmount * loanState.taxBSMVRate) / 100
      );
      const calculatedRate = parseFloat(
        Number(
          interestRate / 100 +
            kkdfAmount / remainingPrincipalAmount +
            bsmvAmount / remainingPrincipalAmount
        ).toFixed(4)
      );
      const installmentAmount = parseFloat(
        loanAmount *
          ((calculatedRate * (1 + calculatedRate) ** loanTerm) /
            ((1 + calculatedRate) ** loanTerm - 1))
      );
      const principalAmount = parseFloat(
        installmentAmount - (profitAmount + kkdfAmount + bsmvAmount)
      );

      remainingLoanTerm--;
      remainingPrincipalAmount = parseFloat(
        remainingPrincipalAmount - principalAmount
      );

      if (remainingPrincipalAmount < 0) {
        remainingPrincipalAmount = 0;
      }

      loan.push({
        installmentNumber: loanTerm - remainingLoanTerm,
        installmentAmount: moneyFormat(installmentAmount),
        principalAmount: moneyFormat(principalAmount),
        remainingPrincipalAmount: moneyFormat(remainingPrincipalAmount),
        profitAmount: moneyFormat(profitAmount),
        kkdfAmount: moneyFormat(kkdfAmount),
        bsmvAmount: moneyFormat(bsmvAmount)
      });
    }

    return loan;
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

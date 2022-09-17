import { createContext, useState, useContext } from 'react';
import { moneyFormat } from 'utils';

const initialState = {
  loanAmount: '',
  loanTerm: '',
  loanType: 'monthly',
  interestRate: '',
  taxBSMVRate: 10,
  taxKKDFRate: 15
};

const LoanFieldsContext = createContext(initialState);

const LoanFieldsProvider = ({ children }) => {
  const [loanState, setLoanState] = useState(initialState);

  const updateLoanState = (field, value) => {
    setLoanState({
      ...loanState,
      [field]: value
    });
  };

  const getLoanTypeChangeRate = remainingPrincipalAmount => {
    switch (loanState.loanType) {
      case 'weekly':
        return parseFloat(remainingPrincipalAmount * (loanState.interestRate / 100) * (7 / 30))
      case 'yearly':
        return parseFloat((remainingPrincipalAmount * (loanState.interestRate / 100) * (365 / 30)) / (loanState.loanTerm + 1));
      case 'monthly':
      default:
        return parseFloat(remainingPrincipalAmount * (loanState.interestRate / 100) * (30 / 30));
    }
  };

  const calculateLoan = () => {
    const { loanAmount, loanTerm, interestRate } = loanState;

    const loan = [];
    let remainingLoanTerm = loanTerm;
    let remainingPrincipalAmount = loanAmount;
    let compoundProfitAmount = 0;

    while (remainingLoanTerm > 0) {
      // const basciProfitAmount = remainingPrincipalAmount * (interestRate / 100) * (loanTypeDay / 30);
      // if u want to calculate profit amount with basic interest rate then use above line

      // const compoundProfitAmount = parseFloat(remainingPrincipalAmount * Math.pow(1 + (interestRate / 100), 30 / 30) - remainingPrincipalAmount)
      // if u want to calculate profit amount with compound interest rate then use above line
       
      // compound profit amount calculation
      compoundProfitAmount = getLoanTypeChangeRate(remainingPrincipalAmount);

      // calculate kkdf amount
      const kkdfAmount = parseFloat((compoundProfitAmount * loanState.taxKKDFRate) / 100);
      // calculate bsmv amount
      const bsmvAmount = parseFloat((compoundProfitAmount * loanState.taxBSMVRate) / 100);
     // calculate total tax amount
      const totalTaxPayment = (kkdfAmount / remainingPrincipalAmount) + (bsmvAmount / remainingPrincipalAmount);
      // calculate installment amount
      const installmentAmount = loanAmount * (((interestRate  / 100) + totalTaxPayment) * ((1 + (interestRate  / 100) + totalTaxPayment) ** loanTerm) / (((1 + (interestRate  / 100) + totalTaxPayment) ** loanTerm ) - 1));
      // calculate principal amount
      const principalAmount = parseFloat(Number(installmentAmount - (compoundProfitAmount + kkdfAmount + bsmvAmount)));

      remainingPrincipalAmount = parseFloat(remainingPrincipalAmount - principalAmount);
      if (remainingPrincipalAmount < 0) remainingPrincipalAmount = 0;
      
      remainingLoanTerm--;

      loan.push({
        installmentNumber: loanTerm - remainingLoanTerm,
        installmentAmount: moneyFormat(installmentAmount),
        principalAmount: moneyFormat(principalAmount),
        remainingPrincipalAmount: moneyFormat(remainingPrincipalAmount),
        profitAmount: moneyFormat(compoundProfitAmount),
        kkdfAmount: moneyFormat(kkdfAmount),
        bsmvAmount: moneyFormat(bsmvAmount)
      });

    }

    return loan;
  };

  const value = {
    loanState,
    updateLoanState,
    calculateLoan
  };

  return (
    <LoanFieldsContext.Provider value={value}>
      {children}
    </LoanFieldsContext.Provider>
  );
};

export const useLoanFields = () => useContext(LoanFieldsContext);

export default LoanFieldsProvider;

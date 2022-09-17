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
    setLoanState({
      ...loanState,
      [field]: value
    });
  };

  const calculateLoan = () => {
    const { loanAmount, loanTerm, loanType, interestRate } = loanState;

    const loan = [];
    let remainingLoanTerm = loanTerm;
    let remainingPrincipalAmount = loanAmount;
    let compoundProfitAmount = 0;

    //  ( Anapara * Kâr oranı * (365 / 30 ))

    while (remainingLoanTerm > 0) {
      // const basciProfitAmount = remainingPrincipalAmount * (interestRate / 100) * (loanTypeDay / 30);
      // if u want to calculate profit amount with basic interest rate then use above line

      // const compoundProfitAmount = parseFloat(remainingPrincipalAmount * Math.pow(1 + (interestRate / 100), 30 / 30) - remainingPrincipalAmount)
      // if u want to calculate profit amount with compound interest rate then use above line
    
      switch (loanType) {
        case 'weekly':
           compoundProfitAmount = (remainingPrincipalAmount * (interestRate / 100) * (7 / 30))
           break;
        case 'yearly':
          compoundProfitAmount = remainingPrincipalAmount * (interestRate / 100) * (365 / 30) / (loanState.loanTerm + 1)
          break;
        case 'monthly':
        default:
          compoundProfitAmount = (remainingPrincipalAmount * (interestRate / 100) * (30 / 30))
          break;
      }
      
      const kkdfAmount = parseFloat((compoundProfitAmount * loanState.taxKKDFRate) / 100);
      const bsmvAmount = parseFloat((compoundProfitAmount * loanState.taxBSMVRate) / 100);
     
      const totalTaxPayment = (kkdfAmount / remainingPrincipalAmount) + (bsmvAmount / remainingPrincipalAmount);
      const installmentAmount = loanAmount * (((interestRate  / 100) + totalTaxPayment) * ((1 + (interestRate  / 100) + totalTaxPayment) ** loanTerm) / (((1 + (interestRate  / 100) + totalTaxPayment) ** loanTerm ) - 1));
 
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

export const useLoanFields = () => {
  const context = useContext(LoanFieldsContext);

  if (!context) {
    throw new Error('useLoanFields must be used within a LoanFieldsProvider');
  }

  return context;
};

export default LoanFieldsProvider;

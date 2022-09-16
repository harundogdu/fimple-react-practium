import React from 'react';
import ReactDOM from 'react-dom/client';
import 'style/style.scss';
import { ThemeContext, LoanFieldsContext } from 'contexts';
import { Home } from 'pages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContext>
    <LoanFieldsContext>
      <Home />
    </LoanFieldsContext>
  </ThemeContext>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'style/style.scss';
import { ThemeContext } from 'contexts';
import { Home } from 'pages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContext>
    <Home />
  </ThemeContext>
);

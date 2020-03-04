import React from 'react';
import GlobalStyle from './styles/Global';
import { Navbar } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;

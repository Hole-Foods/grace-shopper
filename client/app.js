import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/Global';
import { Navbar, AllDonuts } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Content>
        <Navbar />
        <Routes />
        <br />
        {/* <AllDonuts /> */}
      </Content>
    </div>
  );
};

export default App;

const Content = styled.div`
  text-align: left;
  color: #000000;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

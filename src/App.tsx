import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './common-components/header';
import UsersOverview from './features/users/components/users-overview';

const dark = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  return (
    <ThemeProvider theme={dark}>
      <CssBaseline enableColorScheme />
      <div className="App">
      <BrowserRouter>
        <Header />
        <div className="App-header" style={{backgroundImage: 'linear-gradient(blue, yellow)'}}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/users" />} />
            <Route path="/users" element={<UsersOverview />} />
          </Routes>
        </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

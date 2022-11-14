import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './Routes';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from "@mui/material/styles";








const App: FC = () => {
  const routing = useRoutes(routes);

  return (
    <>
      <style>
        {`
          body {
            background-color: #1a2b34;
          }
        `}
      </style>
      <Toaster />
      {routing}
    </>
  );
};


export default App;
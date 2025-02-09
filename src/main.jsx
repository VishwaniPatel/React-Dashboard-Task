import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// core styles are required for all packages
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { resolver, theme } from './core/utility/constants/core.constants.jsx';
import router from './routes.jsx';
import { store } from './store/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme} cssVariablesResolver={resolver}>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </StrictMode>,
)

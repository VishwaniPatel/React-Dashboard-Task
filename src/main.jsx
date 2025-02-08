import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// core styles are required for all packages
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { resolver, theme } from './core/utility/constants/core.constants.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme} cssVariablesResolver={resolver}>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>,
)

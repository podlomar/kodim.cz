import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ClientContextProvider } from '../common/AppContext';
import App from '../common/App';
import { applyHighlightJs } from './highlight.js';

hydrate(
  <ClientContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClientContextProvider>,
  document.getElementById('app'),
);

applyHighlightJs();

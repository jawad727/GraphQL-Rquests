import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';

import useGlobalState from "./Store/useGlobalState"
import { StateProvider } from "./Store/store"


const Index = () => {
  const store = useGlobalState()
  return (
    <StateProvider>
      <App />
    </StateProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

import Raven from 'raven-js';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Boundary from './components/errorBoundary';
import Routes from './components/routes';
import './style.css';

if (process.env.NODE_ENV === 'production') {
  Raven.config('https://60b05bc4ef794a6c9e30e86e6a316083@sentry.io/300397').install();
}

render(
  <HashRouter>
    <Boundary>
      <Routes />
    </Boundary>
  </HashRouter>,
  document.getElementById('root')
);

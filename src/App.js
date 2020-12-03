import { createUseStyles } from 'react-jss'
import { makeStyles } from '@material-ui/styles';

import logo from './logo.svg';
import './App.css';

const useStyles = makeStyles({
  body: {
    margin: '0',
    'fontFamily': '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, sans-serif',
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;
  },  
  code: {
    'fontFamily': 'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace'
  },
  App: {
    textAlign: 'center'
  },
  AppLogo: {
    height: '40vmin',
    pointerEvents: 'none',
    // animation: '$AppLogoSpin infinite 20s linear'
  },
  AppHeader: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: calc('10px' + '2vmin'),
    color: 'white',
  },  
  AppLink: {
    color: '#61dafb'
  },
  '@keyframes AppLogoSpin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  '@media (prefers-reduced-motion: no-preference)': {
    AppLogo: {
      animation: '$AppLogoSpin infinite 20s linear'
    }
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

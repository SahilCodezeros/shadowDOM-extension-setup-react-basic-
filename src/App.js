import logo from './logo.svg';
import './App.css';

const style = {
  App: {
    textAlign: 'center'
  },
  AppLogo: {
    height: '40vmin',
    pointerEvents: 'none'
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
  }
};

function App() {
  return (
    <div style={ style.App }>
      <header style={ style.AppHeader }>
        <img src={logo} style={ style.AppLogo } alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          style={ style.AppLink }
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

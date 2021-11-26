import logo from './logo.svg';
import Header from './Header';
import Login from './Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="AppBody">
        <Login ></Login>
      </div>
    </div>
  );
}

export default App;

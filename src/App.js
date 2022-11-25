import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/login/Login.jsx'
import Home from './components/home/Home.jsx'

function App() {
  return (
    <React.Fragment>
      <div>
        <Route exact path='/login'><Login /></Route>
        <Route path='/'><Home /></Route>
      </div>
    </React.Fragment>
  );
}

export default App;

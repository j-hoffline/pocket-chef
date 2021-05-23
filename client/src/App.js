import {BrowserRouter as Router, Route, useHistory} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import HomePage from './components/HomePage';

function App() {
    let history = useHistory();
  return (
      <Router>
          <Nav />
          <Route exact path="/">
            <HomePage />
          </Route>
      </Router>
  );
}

export default App;

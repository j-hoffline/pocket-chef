import {BrowserRouter as Router, Route, useHistory} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import RecipesPage from "./components/RecipesPage";
import RecipeDetailPage from "./components/RecipeDetailPage";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage"

function App() {
    let history = useHistory();
  return (
      <Router>
          <Nav />
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/recipes">
              <RecipesPage />
          </Route>
          <Route exact path="/recipe_detail">
              <RecipeDetailPage />
          </Route>
          <Route exact path="/search">
              <SearchPage />
          </Route>
          <Footer />
      </Router>
  );
}

export default App;

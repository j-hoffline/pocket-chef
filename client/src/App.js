import {useState} from 'react';
import {BrowserRouter as Router, Route, useHistory} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import RecipesPage from "./components/RecipesPage";
import RecipeDetailPage from "./components/RecipeDetailPage";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage"
import ArticlesPage from './components/ArticlesPage';
import Article from './components/Article';
import AddRecipe from './components/AddRecipe';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  let history = useHistory();

  return (
      <Router>
          <Nav currentUser={currentUser} setCurrentUser={setCurrentUser}/>
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
          <Route exact path="/articles">
            <ArticlesPage />
          </Route>
          <Route path="/article">
            <Article />
          </Route>
          {/* Redirect user if not logged in */}
          <Route path="/add_recipe">
            <AddRecipe currentUser={currentUser}/>
          </Route>
          <Footer />
      </Router>
  );
}

export default App;

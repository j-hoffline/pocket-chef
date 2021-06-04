import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, useHistory} from 'react-router-dom';
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
import Profile from './components/Profile';
import AddArticle from './components/AddArticle';
import $ from 'jquery';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  let history = useHistory();

  //If user is null, check backend for active user on app reload
  useEffect(() => {
      if (!currentUser) {
        $.get('/node_get_current_user').done((data) => {
          if (data.message === "success") {
            setCurrentUser(data.data);
          }
        });
    }
  });

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
            <ArticlesPage currentUser={currentUser}/>
          </Route>
          <Route path="/article">
            <Article currentUser={currentUser}/>
          </Route>
          <Route path="/add_recipe">
            {currentUser ? <AddRecipe currentUser={currentUser}/> : <HomePage />}
          </Route>
          <Route path="/profile">
            {currentUser ? <Profile currentUser={currentUser}/> : <HomePage />}
          </Route>
          <Route path="/add_article">
            {currentUser ? <AddArticle currentUser={currentUser}/> : <HomePage />}
          </Route>
          <Footer />
      </Router>
  );
}

export default App;

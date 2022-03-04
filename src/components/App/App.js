import React from 'react';


import NavBar from '../NavBar/NavBar';
import Search from '../Search/Search';
import Favorites from '../FavoritesList/FavoritesList';

import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";



function App(props) {
  return (
    <Router>
      <>
        <NavBar />
        <div>
          <h1>Giphy Search!</h1>
        </div>
        <Route path="/" exact>
          <Search />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>

      </>
    </Router>
  );
}

export default App;

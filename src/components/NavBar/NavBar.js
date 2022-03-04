// import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Search from '../Search/Search';
// import Favorites from '../Favorites/Favorites';
// import { useHistory} from 'react-router-dom';


// function NavBar() {

//     const history = useHistory();

//     const handleSearch = () => {
//         history.push("/#/");
//     }

//     const handleFavorites = () => {
//         history.push("/#/favorites");
//     }

//     return (
        
//             <header>
//                 <h1>GIFS BABY</h1>
               
//                 <button onClick={handleSearch}>Search</button>
//                 <button onClick={handleFavorites}>Favorites</button>
//             </header>
       
//     )
    
// }
// export default NavBar;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../Search/Search'
import Favorites from '../FavoritesList/FavoritesList'
import { Button } from '@material-ui/core';
// import './App.css';

class NavBar extends Component {

  state = {
    status: true,
    buttonInjection: 'Go to Favorites',
    pageRender: <Search />
  }

  Flipper = () => {
    if (this.state.status) {
      this.setState({
        status: false,
        buttonInjection: 'Go to Search',
        pageRender: <Favorites />
      })
    } else {
      this.setState({
        status: true,
        buttonInjection: 'Go to Favorites',
        pageRender: <Search />
      })
    }
  }

  render() {
    return (
      <div>
        <h1>GIPHY Project</h1>
        <Button onClick={this.Flipper}>{this.state.buttonInjection}</Button>
        {this.state.pageRender}
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(NavBar);
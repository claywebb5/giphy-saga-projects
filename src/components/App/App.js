import React, {Component} from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Search from '../Search/Search';
import FavoritesList from '../FavoritesList/FavoritesList';
import FavoritesListItem from '../FavoritesListItem/FavoritesListItem';
import { Button } from '@material-ui/core';

class App extends Component {

  state = {
    status: true,
    buttonInjection: 'Favorites',
    pageRender: <Search />
  }

  Flipper = () => {
    if (this.state.status) {
      this.setState({
        status: false,
        buttonInjection: 'Search',
        pageRender: <FavoritesList />
      })
    } else {
      this.setState({
        status: true,
        buttonInjection: 'Favorites',
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

export default connect(mapReduxStateToProps)(App);
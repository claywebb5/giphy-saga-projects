import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import FavoritesList from '../FavoritesList/FavoritesList'
import FavoritesListItem from '../FavoritesListItem/FavoritesListItem'

class Search extends Component {

    state = {
        searchTerm: ''
    }

    addToFavorites = (item) => {
        this.props.dispatch({
            type: 'ADD_FAVORITE',
            payload: item
        })
    }

    getGIFs = () => {
        this.props.dispatch({
            type: 'GET_GIPHY'
        })
    }

    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    searchGiphy = () => {
        this.props.dispatch({
            type:'SEARCH_GIFS',
            payload: this.state.searchTerm
        })
        this.getGIFs();
    }

    render() {
        return (
            <div>
                <h1>Search Form!</h1>
                <input onChange={(event) => this.handleChange(event)} type="text" placeholder=""></input>
                <button onClick={this.searchGiphy}>Search</button>
                <ul>
                    {this.props.reduxState.searchResults
                    .map((item)=><li key={item.id}><img src={item.url} width="300px"/></li>)}
                    <button onClick={() => this.addToFavorites(this.props.reduxState.searchResults[0])}>Add to Favorites</button>
                </ul>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(Search);

//Send resp
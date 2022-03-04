import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Search from '../Search/Search';
import FavoritesListItem from '../FavoritesListItem/FavoritesListItem'


class FavoritesList extends Component {

    componentDidMount = () => {
        this.getFavorites();
    }

    getFavorites = () => {
        this.props.dispatch({
            type: 'FETCH_FAVORITE'
        })
    }


    render() {
        return (
            <div>
                <h1>Favorites!</h1><br />
                {this.props.reduxState.favoritesList.map((item) => {
                    return (
                        <FavoritesListItem key={item.id} item={item} />
                    );
                })}
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(FavoritesList);
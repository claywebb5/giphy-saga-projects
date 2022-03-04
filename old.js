// ============================<OLD SEARCH.JS FILE>===================

import React, {Component} from "react";
import {connect} from 'react-redux';
// import { HashRouter as Router, Route, Link } from "react-router-dom";
// import FavoriteList from '../FavoriteList/FavoriteList';
// import FavoriteListItem from '../FavoriteListItem/FavoriteListItem';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Search() {
  const dispatch = useDispatch();
  const [searchGifs, setSearchGifs] = useState("");
  const searchResults = useSelector((store) => store.searchResults);

  const addToFavorites = (item) => {
    console.log('Adding a new Fav', item);
    dispatch({ type: "ADD_FAVORITE", payload: item});
  }

  const submitHandler = () => {
    console.log("in the submit handler", searchGifs);
    dispatch({ type: "SEARCH_GIFS", payload: searchGifs });
    setSearchGifs("");
  };

  return (
    <>
      <input
        value={searchGifs}
        onChange={(evt) => setSearchGifs(evt.target.value)}
      />

      <button onClick={submitHandler}> Search the GIFs </button>

      <div>
        {searchResults.length === 0 ? (
          <span></span>
        ) : (
          searchResults.data.map((item, i) => (
            <div>
              <img key={i} src={item.images.fixed_height.url} />
              <button onClick={() => addToFavorites(item.url)}>Favorite</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(Search);
// export default Search;


// ============================<OLD INDEX.JS FILE>===================

import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Favorites() {

    const dispatch = useDispatch();
    const favorites = useSelector(store => store.favoritesList)

    useEffect(() => {
        dispatch({type: 'FETCH_FAVORITE'})
    }, []);

    
    return (
       <>
      <p>FAVES GO HERE</p>
      <ul>
      {favorites.map((favorite, i) => (
          <li key={i}>
            <img src={favorite.url}></img>
          </li>
        ))}
      </ul>
       </>
    )
    
}
export default Favorites;
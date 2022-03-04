import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux'; 
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';
//=================<IMPORTS>===========================================

// Create sagaMiddleware-----------------------------------------------
const sagaMiddleware = createSagaMiddleware();

// Create the rootSaga generator function------------------------------
function* rootSaga() {
 /// put yield takeEverys here =-] 
    yield takeEvery('SEARCH_GIFS', searchGifs)
    yield takeEvery('FETCH_FAVORITE', getFavoriteSaga)
    yield takeEvery('ADD_FAVORITE', addGifToFavorites)
    yield takeEvery('CATEGORIZE_GIFS', categorizeGifs);
    yield takeEvery('DELETE_GIFS', deleteGifs);
}


// GET GIFS TO SEARCH PAGE---------------------------------------------------
function* searchGifs(action){
   console.log( action.payload, 'baby');
//    let response = 
    try {
        const results = yield axios.get(`/api/giphy/${action.payload}` )
        yield put({ type: 'SET_RESULTS', payload: results.data })
    } catch (error){
        console.log('error in search gifs', error );
    }
}

// SEARCH RESULTS REDUCER--------------------------------------------------
const searchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_RESULTS':
            return action.payload;
        default:
            return state;
    }
};   

// Favorites Reducer-------------------------------------------------------
const favoritesList = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVORITE':
            return action.payload;
        default:
            return state;
    }
};

// GET Favorites Saga---------------------------------------------------------------
function* getFavoriteSaga() {
    console.log('In getFavoriteSaga');
    try {
        const response = yield axios.get('/api/favorite');
        yield put({type: "SET_FAVORITE", payload: response.data})
    } catch (error) {
        console.log('Error with Get:', error);
        
    }
}

// (POST) ADD GIF TO FAVORITES----------------------------------------------------
function* addGifToFavorites(action) {
    const objectToPost = action.payload;
    try {
        // yield axios.post('/api/favorite', objectToPost);
        yield axios({
            method: 'POST',
            url: `/api/favorite/${objectToPost}`,
            data: objectToPost
        })
        yield put({type: 'FETCH_FAVORITE'});
    } catch (error) {
        console.log('Error adding a new favorite', error);
    }
}

// SET CATEGORY===============================================================================
function* categorizeGifs(action) {
    yield console.log('logging acion.payload.id in categorizeGifs', action.payload.id);
    // const objectToPost = action.payload;
    try {
        yield axios({
            method: 'PUT',
            url: `/api/favorite/${action.payload.id}`,
            data: {category_id: action.payload.category_id}
        })
        yield put({type: 'FETCH_FAVORITE'})
    } catch (error) {
        console.log(error);
    }
}

// DELETE===============================================================================
function* deleteGifs(action) {
    console.log('logging action.payload from delete', action.payload);
    let gifId = action.payload;
    try {
        yield axios({
            method: 'DELETE',
            url: `/api/favorite/${action.payload}`,
            data: {gifId}
        })
        yield put({
            type: 'FETCH_FAVORITE'
        })
    }
    catch (error) {
        console.log(error);
        alert('Unable to delete item');
    };
}



const storeInstance = createStore(
    combineReducers({
        searchResults,
        favoritesList
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);


ReactDOM.render( <Provider store={storeInstance}> <App /> </Provider> ,  document.getElementById('root'));
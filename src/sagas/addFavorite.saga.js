// import {put} from 'redux-saga/effects';
// import axios from 'axios';


// // (POST) ADD GIF TO FAVORITES----------------------------------------------------
// function* addGifToFavorites(action) {
//     // const objectToPost = action.payload;
//     console.log('objectToPost is:', action.payload);
//     try {
//         yield axios.post('/api/favorite', action.payload);
//         // yield axios({
//         //     method: 'POST',
//         //     url: '/api/favorite',
//         //     data: objectToPost
//         // })
//         yield put({type: 'FETCH_FAVORITES'});
//     } catch (error) {
//         console.log('Error adding a new favorite', error);
//     }
// }

// export default addGifToFavorites;
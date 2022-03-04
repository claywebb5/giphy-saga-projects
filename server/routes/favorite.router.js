const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  // let queryText = 'SELECT * FROM favorites;';
  let queryText = 'SELECT favorites.id, favorites.url, favorites.category_id, category.name FROM favorites JOIN category ON favorites.category_id = category.id ORDER BY "id" ASC;'
  pool.query(queryText)
  .then(result => {
    console.log('Success!');
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error in get on favorite.router.js!!', error);
    res.sendStatus(500);
  })
});

// add a new favorite
router.post('/', (req, res) => {
  let newFav = req.body;
  console.log('In favorite.router.js and the req.body is:', newFav);

  let queryText = `INSERT INTO "favorites" ("url", "name")
                    VALUES ($1, $2);`;
  pool.query(queryText, [newFav.url, newFav.category_id])
  // pool.query(, [newFav.url, newFav.name])

  .then(result => {
    console.log('Successful Post!!');
    
    res.sendStatus(201);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
  
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  console.log('logging body', req.body.category_id );
  let category_id = req.body.category_id;

  let queryString = `UPDATE "favorites" SET category_id = ${category_id} WHERE "id" = ${req.params.favId}`
  pool.query(queryString).then((results) => {
    res.sendStatus(200);
  }).catch((err) => {
    res.sendStatus(500);
    console.log(err);
  })
});

// delete a favorite
router.delete('/:id', (req, res) => {

  let gifId = req.body.gifId;
  let queryText = `DELETE FROM favorites WHERE id=$1`
  pool.query(queryText, [gifId]).then((results) => {
    res.sendStatus(200);
  }).catch((err) => {
    res.sendStatus(500);
    console.log(err);
  })
});

module.exports = router;
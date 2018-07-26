const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    let queryText = `SELECT product.id, product.product_number, product.name, current_price.value, current_price.currency_code, current_price.product_id FROM current_price JOIN product ON current_price.product_id = product.id WHERE product.id = $1;
    `;
    pool.query(queryText, [req.params.id])
    .then((result) => {
        res.send(result.rows);
        console.log(result.rows);
    })
    .catch((error) => {
        console.log('error in GET', error);
        res.sendStatus(500);
    })
    
});

/**
 * POST route template
 */
router.get('/name', (req, res) => {
    let queryText = `SELECT * FROM product`;
    pool.query(queryText)
    .then((result)=> {
        res.send(result.rows);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
});

router.put('/:id', (req, res) => {
    let queryText = `UPDATE current_price SET value = $1 WHERE product_id = $2`;
    pool.query(queryText, [req.body, req.params.id])
    .then((result)  => {
        res.sendStatus(201);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();
const {getProduct, getSpecificProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/Product')
 
//routes for the products
router.get('/', getProduct)  //to gets all product
router.get('/:id', getSpecificProduct) // to gets a specified product with id
router.post('/', createProduct); //to create neww product
router.put('/:id', updateProduct) // to updates a product
router.delete('/:id', deleteProduct) // to deletes a product

module.exports = router;
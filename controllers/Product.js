
//Import products into our app.
let products = require('../models/Product.js')


//getProduct function
const getProduct = (req, res) =>{
    return res.json(products);
}

//get a specific product function
const getSpecificProduct = (req, res) =>{
    let productId = Number(req.params.id);
    let findProduct = products.find((product) => product.id === productId);
//send back an error message if the product id is not found
    if(!findProduct){
        return res.status(404).send(`Product with id of ${productId} cannot be found in our database`);
    }else {
        return res.json(findProduct);
    }

}

//function to create a post
const createProduct = (req, res) =>{

    if(!req.body.name || !req.body.description || !req.body.image || !req.body.price){
       return res.status(400).send('Kindly, fill all the required fields.')
    }else{
        //Create a product
let newProduct = {
    id: products.length + 1,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price
}
    //add product to our product array and display product
    products.push(newProduct);
    return res.json(products)

    }


}


//update a product function
const updateProduct = (req, res) =>{
    let productId = Number(req.params.id);
    let body = req.body;
    //finding product by id
    let product = products.find((product) => product.id === productId);
    //get the position of the product in the product array
    let indexOfProduct = products.indexOf(product);
    if(!product){
        return res.status(404).send(`Product with id of ${productId} not found`)
    }else{
        //updating old product with the new changes
        let updateProduct = {...product, ...body};
        products[indexOfProduct] = updateProduct;
       return res.json(updateProduct)
    }
}

//Delete product action
const deleteProduct = (req,res) =>{
    let productId = Number(req.params.id);
    let deleteProduct = products.filter((product) => product.id !== productId);
    if(!deleteProduct){
        return res.status(404).send(`Product with id of ${productId} not found`);
    }else{
         //return the remaining products only
        products = deleteProduct;
        return res.json(products);
    }
}


module.exports = { getProduct, getSpecificProduct, createProduct, updateProduct, deleteProduct }
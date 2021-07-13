const express = require('express');
	const app = express();
	

	//Importing products.
	let products = require('./model/products.js')
	
	const PORT = process.env.PORT || 5000;
	

	app.use(express.json());
	app.use(express.urlencoded({extended: true}));
	

	//Router Base
	app.get('/', (req, res) =>{
	    res.json(products)
	})
	

	//Creating another router to get all products.
	app.get('/products', (req, res) =>{
	    res.json(products)
	})
	
	//routing to get specific product
	app.get('/products/:id', (req, res) =>{
	    let productId = Number(req.params.id);
	    let getProduct = products.find((product) => product.id === productId);
	
		//an error message should be sent back if the product id is not found
	    if(!getProduct){
	        res.status(404).send(`Cannot find product with id of ${productId}`);
	    }else {
	        res.json(getProduct);
	    }
	});
	

	//Post request 
	app.post('/products', (req, res) =>{
	    if(!req.body.name || !req.body.description || !req.body.image || !req.body.price){
	        res.status(400).send('Please, fill all the required fields.')
	    }else{
	        //Product creation
	let newProduct = {
	    id: products.length + 1,
	    name: req.body.name,
	    description: req.body.description,
	    image: req.body.image,
	    price: req.body.price
	}
	    //adding a new product to our product array and display product
	    products.push(newProduct);
	    res.json(products)
	    }

	})
	

	//Let's update a product using 'put' method
	app.put('/products/:id', (req, res) =>{
	    let productId = Number(req.params.id);
	    let body = req.body;
	    //find product by id
	    let product = products.find((product) => product.id === productId);
	    //get the position of the the product in the product array
	    let indexOfProduct = products.indexOf(product);
	    if(!product){
	        res.status(404).send(`Product with id of ${productId} not found`)
	    }else{
	        //update old product with the new changes
	        let updateProduct = {...product, ...body};
	        products[indexOfProduct] = updateProduct;
	        res.json(updateProduct)
	    }
	})
	

	//Deleting a product
	app.delete('/products/:id',(req,res) =>{
	    let productId = Number(req.params.id);
	    let deleteProduct = products.filter((product) => product.id !== productId);
	    if(!deleteProduct){
	        res.status(404).send(`Product with id of ${productId} not found`);
	    }else{
	         //return the remaining products only
	        products = deleteProduct;
	        res.json(products);
	    }
	})

	app.listen(PORT, ()=>{
	    console.log(`Server running on http://127.0.0.1:${PORT}`)
	})

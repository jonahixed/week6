
//import user into our app
let users = require('../models/User');

//Signup function

const signUp = (req, res) =>{
    let userEmail = req.body.email;
    //loop through the database to check if there is an existing userEmail
    let foundEmail = users.find((user) => user.email === userEmail);
    if(foundEmail){
        return res.send(`This email: ${userEmail}, has already been used by another user.`)
    }
    //don't create the user if password and confirmPassword are not the same
    else if(req.body.password !== req.body.confirmPassword){
       return res.json('Password and confirmPassword, does not match')

    }
    //Also check if the new user filled all the fields correctly
    else if (!req.body.email || !req.body.fullName || !req.body.password || !req.body.confirmPassword){
        res.json("All fields are required. Kindly fill all fields")
    }
    //if the above is not the case, create the new user
    else{
        let newUser = {
            id: users.length + 1,
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }
        //add newUser to the list of users
        users.push(newUser);
        return res.json(users)
    }
    

}

//Create a signIn function
const signIn = (req, res) =>{
    //declare signIn details
    let signInDetails = {
        email: req.body.email,
        password: req.body.password
    }
    //check dummy database and return the user whose email and password match our signInDetails
    let foundUser = users.find((user) =>{
        if(user.email === signInDetails.email && user.password === signInDetails.password){
            return user;
        }
    })
    //if there is no match, let the person signUp first
    if(!foundUser){
        res.json("You need sign-Up first, or make sure you type your email and password correctly and try again.")
    }
    
    return res.json(foundUser)

}

//function to get all users 
const getUsers = (req, res) =>{
    return res.json(users)
}


module.exports = { signUp, signIn, getUsers }
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User" +username+ "successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User" +username+ " already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
    // Assuming you have a function to hash passwords
    const hashedPassword = hashPasswordFunction(password);
  
    // Store the new user in your 'users' object
    users[username] = hashedPassword;
  
    return res.status(201).json({ message: "Registration successful" });
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
res.send(JSON.stringify({books}, null, 2));
//Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
const isbn = req.params.isbn;
    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
    res.send(books[author])
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
   const title = req.params.title;
    res.send(books[title])
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbnParam = req.params.isbn;

    // Get the book reviews based on ISBN provided in the request parameters

    const reviews = books[isbnParam]["reviews"];

    if (!reviews) {

      res.status(404).json({ message: 'No reviews found for the ISBN provided' });

    } else {

      res.status(200).json(reviews);

    }
});

module.exports.general = public_users;

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
'books'{
      "1": {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      "2": {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      "3": {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      "4": {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      "5": {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      "6": {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      "7": {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      "8": {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      "9": {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      "10": {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} };
}  

//Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

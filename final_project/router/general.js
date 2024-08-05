const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
   
  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    if (users.hasOwnProperty(username)) {
      return res.status(409).json({ message: "Username already exists" });
    }
  
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
  
  if (books.hasOwnProperty(isbn)) {
    const bookDetails = books[isbn];
    return res.json(bookDetails);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const authorName = req.params.author;
  const bookKeys = Object.keys(books);
  const booksByAuthor = [];
  
  for (const key of bookKeys) {
    if (books[key].author === authorName) {
      booksByAuthor.push(books[key]);
    }
  }
  
  if (booksByAuthor.length > 0) {
    return res.json(booksByAuthor);
  } else {
    return res.status(404).json({ message: "No books found by the provided author" });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
   const bookTitle = req.params.title; // Get the title from request parameters
    const bookKeys = Object.keys(books); // Obtain all the keys for the 'books' object
  
    const booksByTitle = [];
  
    // Iterate through the 'books' array & check the title matches the one provided in the request parameters
    for (const key of bookKeys) {
      if (books[key].title === bookTitle) {
        booksByTitle.push(books[key]);
      }
    }
  
    if (booksByTitle.length > 0) {
      return res.status(200).json(booksByTitle);
    } else {
      return res.status(404).json({ message: "No books found with the provided title" });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "Customer successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "Customer with same username already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register customer."});
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },300)})
    myPromise.then((successMessage) => {
        let bookArray = {};

        for (let key in books){
            bookArray[key] = books[key].title;
        }
        res.send(books);
        })
});

// Get book details based on ISBN
public_users.get('/books/isbn/:isbn',function (req, res) {
    const get_books_isbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    // console.log(isbn);
        if (req.params.isbn <= 10) {
        resolve(res.send(books[isbn]));
    }
        else {
            reject(res.send('ISBN not found'));
        }
    });
    get_books_isbn.
        then(function(){
            console.log("Promise for Task 11 is resolved");
   }).
        catch(function () { 
                console.log('ISBN not found');
  });

});
// Get book details based on author
public_users.get('/books/author/:author',function (req, res) {

    const get_books_author = new Promise((resolve, reject) => {

    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));
      }


    });
    reject(res.send("The mentioned author does not exist "))
        
    });

    get_books_author.then(function(){
            console.log("Promise is resolved");
   }).catch(function () { 
                console.log('The mentioned author does not exist');
  });

  });

// Get all books based on title
public_users.get('books/title/:title',function (req, res) {
    const get_books_title = new Promise((resolve, reject) => {
    const title = req.params.title;
    // console.log(title);
        if (req.params.title <= 10) {
        resolve(res.send(books[title]));
    }
        else {
            reject(res.send('Title not found'));
        }
    });
    get_books_title.
        then(function(){
            console.log("Promise for Task 13 is resolved");
   }).
        catch(function () { 
                console.log('Title not found');
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const review = req.params.review;
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },300)})
    myPromise.then((successMessage) => {
        let bookArray = {};

        for (let key in books){
            if(books[key].review == review){
                bookArray[key] = books[key];
            }
        }
        res.send(bookArray);
    })
});

module.exports.general = public_users;


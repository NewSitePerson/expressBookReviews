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
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },300)})
    myPromise.then((successMessage) => {
        let bookArray = {};

        for (let key in books){

            //res.send(books[key].author);
            if(books[key].author === author){
                bookArray[key] = books[key];
            }
        }
        let booksbyauthor = {"booksbyauthor": bookArray}
        res.send(booksbyauthor);
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },300)})
    myPromise.then((successMessage) => {
        let bookArray = {};

        for (let key in books){
            if(books[key].title == title){
                bookArray[key] = books[key];
            }
        }
        res.send(bookArray);
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const title = req.params.title;
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },300)})
    myPromise.then((successMessage) => {
        let bookArray = {};

        for (let key in books){
            if(books[key].title == title){
                bookArray[key] = books[key];
            }
        }
        res.send(bookArray);
    })
});

module.exports.general = public_users;


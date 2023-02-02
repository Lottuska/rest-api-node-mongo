const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');

// Get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books)
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})
// Get one book
router.get("/book/:id", async (req, res) => {
  try {
    const book = await Book.findById({ _id: req.params.id });
    res.send(book)
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

// Add Book
router.post("/books", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    published: req.body.year,
    genre: req.body.genre
  });
  try {
    const newBook = await book.save();
    res.status(201).json({ newBook });
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

// Delete book
router.delete("/books", async (req, res) => {
  await Book.deleteOne({title: req.body.title}, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      res.status(200).json(result);
    }
  });
})

// Update book by id
router.put("/books/:id", async (req, res) => {
  await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (err, result) => { 
    if (err) { 
      return res.status(500).json({ message: err.message });
    } 
    else { 
      res.status(200).json({ result });
    } 
  });
})

module.exports = router;

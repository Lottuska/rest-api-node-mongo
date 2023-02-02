const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');

// Get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books)
  } catch(error) {
    return res.status(500).json({ message: error.message });
  }
})
// Get one book
router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById({ _id: req.params.id });
    res.send(book)
  } catch(error) {
    return res.status(500).json({ message: error.message });
  }
})

// Add Book
router.post("/books", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    published: req.body.published,
    genre: req.body.genre
  });
  try {
    const newBook = await book.save();
    res.status(201).json({ newBook });
  } catch(error) {
    return res.status(500).json({ message: error.message });
  }
})

// Delete book
router.delete("/books/:id", async (req, res) => {
  await Book.deleteOne({_id: req.params.id}, (error, result) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    } else {
      res.status(200).json(result);
    }
  });
})

// Update book by id
router.put("/books/:id", async (req, res) => {
  await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (error, result) => { 
    if (error) { 
      return res.status(500).json({ message: error.message });
    } 
    else { 
      res.status(200).json({ result });
    } 
  });
})

module.exports = router;

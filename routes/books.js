const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', booksController.getAllBooks);

router.get('/:id', booksController.getSingle);

router.post('/', isAuthenticated, validation.saveBook, booksController.insertBook);

router.put('/:id', isAuthenticated, validation.saveBook, booksController.updateBook);

router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;
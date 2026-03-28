const mongodb = require('../data/database');

const getAllBooks = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const getSingle = async(req, res) => {
    const bookId = req.params.id;
    const result = await mongodb.getDatabase().db().collection('books').find({_id: bookId});
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
}

const insertBook = async (req, res) => {
  try {
    const book = {
      _id: req.body._id,
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year
    };

    const result = await mongodb.getDatabase().db().collection('books').insertOne(book);

    if (result.acknowledged) {
      res.status(201).json({ message: "Book created successfully" });
    } else {
      res.status(500).json("Failed to insert book");
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const updateBook = async(req, res) => {
    const bookId = req.params.id;
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year
    };
    const result = await mongodb.getDatabase().db().collection('books').replaceOne({_id: bookId}, book);
    if (result.modifiedCount > 0){
        res.status(201).json({ message: "Book updated successfully" });
    } else {
        res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
};

const deleteBook = async(req, res) => {
    const bookId = req.params.id;
    const result = await mongodb.getDatabase().db().collection('books').deleteOne({_id: bookId});
    if (result.deletedCount > 0) {
        res.status(201).json({ message: "Book deleted successfully" });
    } else {
        res.status(500).json(result.error || 'Book not found');
    }
};

module.exports = {getAllBooks, getSingle, insertBook, updateBook, deleteBook}
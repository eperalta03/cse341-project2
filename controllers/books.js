const mongodb = require('../data/database');

const getAllBooks = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('books')
      .find()
      .toArray(); 

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Books']

    const bookId = req.params.id;

    if (!/^\d{10}(\d{3})?$/.test(bookId)) {
        return res.status(400).json('Must use a valid ISBN to find a book.');
    }

    try {
        const book = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .findOne({ _id: bookId });

        if (!book) {
        return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const insertBook = async (req, res) => {
    //#swagger.tags=['Books']
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
      res.status(201).json("Book created successfully");
    } else {
      res.status(500).json("Failed to insert book");
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const updateBook = async(req, res) => {
    //#swagger.tags=['Books']
    const bookId = req.params.id;

    if (!/^\d{10}(\d{3})?$/.test(bookId)) {
        return res.status(400).json('Must use a valid ISBN to find a book.');
    }
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year
    };
    const result = await mongodb.getDatabase().db().collection('books').replaceOne({_id: bookId}, book);
    if (result.modifiedCount > 0){
        res.status(201).json("Book updated successfully");
    } else {
        res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
};

const deleteBook = async(req, res) => {
    //#swagger.tags=['Books']
    const bookId = req.params.id;

    if (!/^\d{10}(\d{3})?$/.test(bookId)) {
        return res.status(400).json('Must use a valid ISBN to find a book.');
    }
    const result = await mongodb.getDatabase().db().collection('books').deleteOne({_id: bookId});
    if (result.deletedCount > 0) {
        res.status(201).json("Book deleted successfully");
    } else {
        res.status(500).json(result.error || 'Book not found');
    }
};

module.exports = {getAllBooks, getSingle, insertBook, updateBook, deleteBook}
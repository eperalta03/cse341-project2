const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hi World! This is my second API!')
});

router.use('/books', require('./books'));

module.exports = router
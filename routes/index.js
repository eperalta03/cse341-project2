const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hi World! This is my second API!')
});

router.use('/books', require('./books'));

module.exports = router
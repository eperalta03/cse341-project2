const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');
const validation = require('../middleware/studentsValidator');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', studentController.getAllStudents);

router.get('/:id', studentController.getSingle);

router.post('/', isAuthenticated, validation.saveStudent, studentController.createStudent);

router.put('/:id', isAuthenticated, validation.saveStudent, studentController.updateStudent);

router.delete('/:id', isAuthenticated, studentController.deleteStudent);

module.exports = router;
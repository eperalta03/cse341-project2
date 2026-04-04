const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');
const validation = require('../middleware/studentsValidator');

router.get('/', studentController.getAllStudents);

router.get('/:id', studentController.getSingle);

router.post('/', validation.saveStudent, studentController.createStudent);

router.put('/:id', validation.saveStudent, studentController.updateStudent);

router.delete('/:id', studentController.deleteStudent);

module.exports = router;
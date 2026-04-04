const { application } = require('express');
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllStudents = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const result = await mongodb.getDatabase().db().collection("students").find().toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Students']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to find a student.');
    }

    const studentId = new ObjectId(req.params.id);

    try {
        const student = await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .findOne({_id: studentId});
    
        if (!student) {
           return res.status(404).json("Book not found") 
        }
        res.status(200).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};

const createStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            major: req.body.major,
            age: req.body.age
        };

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .insertOne(student);
        
        if (result.acknowledged) {
            res.status(201).json('Student created succesfully');
        } else {
            res.status(500).json('Failed to create a new student');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message});
    }
};

const updateStudent = async(req, res) => {
    //#swagger.tags=['Students']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to find a student.');
    }

    const studentId = new ObjectId(req.params.id);

    try {
        const student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            major: req.body.major,
            age: req.body.age
        };

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .replaceOne({_id: studentId}, student);

        if (result.modifiedCount > 0) {
            res.status(201).json('Student updated successfully');
        } else {
            res.status(500).json(result.error || 'Some error occurred while updating the student.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
};

const deleteStudent = async (req, res) => {
    //#swagger.tags=['Students']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be a valid student id to find a student');
    }

    const studentId = new ObjectId(req.params.id);

    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .deleteOne({_id: studentId});

        if (result.deletedCount > 0) {
            res.status(201).json('Student deleted successfully');
        } else {
            res.status(500).json(result.error || 'Some error ocurred while deleting the student');
        }
    } catch (err){
        console.error(err);
        res.status(500).json({error: err.message});
    }
};

module.exports = {getAllStudents, getSingle, createStudent, updateStudent, deleteStudent}
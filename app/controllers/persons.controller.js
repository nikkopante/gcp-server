const db = require("../models");
const Persons = db.persons;
const Op = db.Sequelize.Op;

// Create and Save a new Person
exports.create = (req, res) => {
    // Validate request
    if (!req.body.first_name || !req.body.last_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Person
    const person = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        ip_address: req.body.ip_address,
        company_name: req.body.company_name,
        designation: req.body.designation,
        country_code: req.body.country_code,
        age: req.body.age
    };

    // Save Person in the database
    Persons.create(person)
        .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Person."
        });
    });
};

// Retrieve all Persons from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    Persons.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving persons."
        });
    });
};

// Find a single Person with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Persons.findByPk(id)
    .then(data => {
        if(data === null){
            res.status(400).send({
                message: "Person not found."
            });
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Person with id=" + id
        });
    });
};

// Update a Person by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Persons.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Person was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Person with id=${id}. Maybe Person was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Person with id=" + id
        });
    });
};

// Delete a Person with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Persons.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Person was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Person with id=${id}. Maybe Person was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Person with id=" + id
        });
    });
};

// Delete all Persons from the database.
exports.deleteAll = (req, res) => {
    Persons.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} Persons were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all persons."
        });
    });
};
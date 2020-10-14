const db = require("../models");
const Customer = db.customers;
const Subordinate = db.subordinates;
const Op = db.Sequelize.Op;



/*
 http://localhost:3030/api/customers
Request Method: POST
{
"designation": "Tjukud"
"email": "test@gmail.com"
"name": "Teshy"
"qualification": "MBA"
"subordinate": [{"sname": "Mike", "sdesignation": "MGR 2"}, {"sname": "Joke", "sdesignation": "MGR #"}]
}
*/
// Create and Save a new Customer
exports.create = (req, res) => {
    
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Customer
    const customer = {
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      qualification: req.body.qualification
    };
  
    // Save Customer in the database
    Customer.create(customer)
      .then(data => {
        console.log(`Insert Customer success`);       


        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
    });    
  };

/*
[
    {
        "id": 6,
        "name": "Teshy",
        "designation": "Tjukud",
        "email": "test@gmail.com",
        "qualification": "MBA",
        "createdAt": "2020-10-14T11:08:22.000Z",
        "updatedAt": "2020-10-14T11:08:22.000Z"
    }
]
 */
// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Subordinate.findAll().then(sOrdList=>{
      Customer.findAll({ where: condition })
        .then(dbCustomersList => {
          var finalCustomersList = [];
          dbCustomersList.forEach((cust, index)=>{
            var currentSubordinates = sOrdList.filter(sOrd=>{
              return sOrd.customerEmail==cust.email;
            });
            var currentCustomer = {
              id: cust.id,
              name: cust.name,
              designation: cust.designation,
              email: cust.email,
              qualification: cust.qualification,
              createdAt: cust.createdAt,
              updatedAt: cust.updatedAt,
              subordinates: currentSubordinates
            };
            finalCustomersList.push(currentCustomer);    
          });
          res.send(finalCustomersList);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Customer."
          });
        }
      );
    });
  
  };

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Customer.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Customer with id=" + id
        });
      });
  };

// Update a Customer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Customer.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customer with id=" + id
        });
      });
  };

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Customer.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Customer with id=" + id
        });
      });
  };
// Delete all Customer from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Customer were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Customers."
        });
      });
  };;




exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Customer
    const customer = {
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      qualification: req.body.qualification
    };
  
    // Save Customer in the database
    Customer.create(customer)
      .then(data => {
        req.body.subordinate.forEach((sOrd)=>{
          var subordinatePayload = {
            customerEmail: req.body.email,
            name: sOrd.sname,
            designation: sOrd.sdesignation,
          };
          
          console.log(sOrd.sname);
      
          Subordinate.create(subordinatePayload).then(data=>{ console.log(sOrd.sname);});
        });
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      });
  };
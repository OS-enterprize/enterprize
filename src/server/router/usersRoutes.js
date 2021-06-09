const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');


//ROUTE FOR DEFAULT (GET) - /api/users/
router.get('/',
  (req, res) => {
    console.log('Entered /users/');
    res.status(200).json();
  }
);

//ROUTE FOR LOGIN (POST) - /api/users/login
router.post('/login',
  (req, res) => {
    console.log('Entered /users/login')
  }
);

//ROUTE FOR CREATING A NEW USER (POST) - /api/users/create
router.post('/create',
  (req, res) => {
    console.log('Entered /users/create');
    res.status(200).json();
  }
);

//ROUTE FOR ADDING A USER TO A GROUP (POST) - /api/users/groups
router.post('/groups',
  (req, res) => {
    console.log('Entered /users/groups');
    res.status(200).json();
  }
);

//ROUTE FOR DELETING A USER FROM A GROUP (DELETE) - /api/users/groups/:userID/:groupID
router.delete('/:userID/:groupID',
  (req, res) => {
    console.log('Entered /users/groups Delete');
    res.status(200).json();
  }
);

module.exports = router;

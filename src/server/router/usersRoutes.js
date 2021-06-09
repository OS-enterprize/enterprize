const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');


//ROUTE FOR DEFAULT (GET) - /api/users/
router.get('/', 
    usersController.verifySessionCookie, 
    usersController.getUserInfoByCookie, 
    usersController.getGroupsFromUserID,
    usersController.constructResponse,
    (req, res) => {
    return res.status(200).json(res.locals.finalResponse);
})


//ROUTE FOR LOGIN (POST) - /api/users/login
router.post('/login', 
    usersController.getUserInfoByUsername, 
    usersController.verifyPassword,
    usersController.getGroupsFromUserID, 
    usersController.createSSID,
    usersController.setCookie,
    usersController.addSessionToDB, 
    usersController.constructResponse,
    (req, res)=> {
    return res.status(200).json(res.locals.finalResponse);
});


//ROUTE FOR CREATING A NEW USER (POST) - /api/users/create
router.post('/create', 
    usersController.encryptPassword,
    usersController.insertUserIntoUsers,
    usersController.getUserInfoByUsername, 
    usersController.getGroupsFromUserID, 
    usersController.createSSID,
    usersController.setCookie,
    usersController.addSessionToDB,
    usersController.constructResponse,
  (req, res)=> {
    return res.status(200).json(res.locals.finalResponse);
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

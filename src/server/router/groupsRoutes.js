const express = require('express');

const router = express.Router();

const groupsController = require('../controllers/groupsController');

//ROUTE FOR GETTING USERS IN A GROUP (GET) - /api/groups/:groupID
router.get(
  '/:groupID',
  groupsController.groupUsers,
  (req, res) => {
    console.log('Entered /groups/ - Getting group users');
    res.status(200).json();
  }
);

//ROUTE FOR CREATING A NEW GROUP (POST) - /api/groups/
router.post(
  '/',
  groupsController.createGroup,
  (req, res) => {
    console.log('Entered /groups/ - Getting group users');
    res.status(200).json();
  }
);


module.exports = router;


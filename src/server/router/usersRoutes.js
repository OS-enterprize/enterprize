const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', 
    usersController.verifySessionCookie, 
    usersController.getUserInfoByCookie, 
    usersController.getGroupsFromUserID,
    usersController.constructResponse,
    (req, res) => {
    return res.status(200).json(res.locals.finalResponse);
})

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
});

router.delete('/groups/:userId/:groupId', /**INSERT MIDDLEWARE */ (req, res)=> {
    return res.status(200).json(res.locals.deletedUserFromGroup);
});

router.post('/groups', /**Insert Middleware */ (req, res) => {
    return res.status(200).json(res.locals.addedUserToGroup)
})


module.exports = router;
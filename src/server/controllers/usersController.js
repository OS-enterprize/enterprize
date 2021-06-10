//IMPORT MODELS FILE
const db = require('../models/models.js');
const bcrypt = require('bcrypt');

const usersController = {};



usersController.verifySessionCookie = (req, res, next) => {

    if (!req.cookies.ssid) {
        res.locals.verifySession = false;
        res.locals.finalResponse = {};
        return next();
    }

    const { ssid } = req.cookies

    const query = 'SELECT user_id AS userid, created_at FROM sessions WHERE ssid=$1'
    const values = [ssid];


    db.query(query, values)
        .then(ssid => {

            if (ssid.rows.length <= 0) {
                res.locals.verifySession = false;
                res.locals.finalResponse = {};
                return next();
            }
            const currentTime = Date.now()
            const dataBaseTime = new Date(ssid.rows[0].created_at) - 14400000;

            if (currentTime - dataBaseTime > 120000) {
                res.locals.verifySession = false;
                res.locals.finalResponse = {};
                return next();
            }

            res.locals.verifySession = true;
            res.locals.userId = ssid.rows[0].userid;

            return next();
        })

}



usersController.createSSID = (req, res, next) => {
    if (res.locals.verifySession === false || res.locals.loginSuccess === false || res.locals.verifyInfo === false) return next();

    const ssid = Math.floor(Math.random() * 100000000);

    const query = `SELECT ssid FROM sessions WHERE ssid=$1`;
    const values = [ssid];

    db.query(query, values)
        .then(data => {
            if (data.rows.length >= 1) return usersController.createSSID();
            res.locals.ssid = ssid;
            return next();

        }).catch(err => {
            next({
                log: `Error occured in createSessionCookie when checking if ssid existed, ${err}`,
            })
        })

}

usersController.setCookie = (req, res, next) => {
    if (res.locals.verifySession === false || res.locals.loginSuccess === false || res.locals.verifyInfo === false) return next();
    //max age is being set as 2 minutes
    res.cookie('ssid', res.locals.ssid, { httpOnly: true, maxAge: 120000 });
    return next();
}

usersController.addSessionToDB = (req, res, next) => {
    if (res.locals.verifySession === false || res.locals.loginSuccess === false || res.locals.verifyInfo === false) return next();
    const { ssid } = res.locals;
    const { id: userId } = res.locals.allUserInfo;
    const query = 'INSERT INTO sessions (ssid, user_id) VALUES ($1, $2)';
    const values = [ssid, userId];

    db.query(query, values)
        .then(data => {
            return next();
        }).catch(err => {
            next({
                log: `Error in addSessionToDB, error with DB: ${err}`
            })
        })


}

usersController.getUserInfoByCookie = (req, res, next) => {
    if (res.locals.verifySession === false) return next();
    const { userId } = res.locals;
    const query = `SELECT id, first_name, last_name, email, username FROM users WHERE id=$1`;
    const values = [userId];

    db.query(query, values)
        .then(data => {
            if (data.rows.length <= 0) {
                return next({
                    log: 'User not in the Database in getUserInfo',
                })
            }

            res.locals.allUserInfo = data.rows[0];
            return next();

        }).catch(err => {
            next({
                log: `Err getting User info from UsersTable in getUserInfo: ${err}`
            })
        })

}

usersController.getGroupsFromUserID = (req, res, next) => {
    if (res.locals.verifySession === false || res.locals.loginSuccess === false || res.locals.verifyInfo === false) return next();
    const { id: userId } = res.locals.allUserInfo;

    const query = 'SELECT group_id FROM user_groups WHERE user_id=$1'
    const values = [userId];
    db.query(query, values)
        .then(data => {
            const groupIds = data.rows.map(object => object.group_id)
            res.locals.groupIds = groupIds;
            return next();
        }).catch(err => {
            return next({
                log: `Error in getGroupsFromUserID when executing query: ${err}`
            })
        })


}

usersController.getUserInfoByUsername = (req, res, next) => {
    if (res.locals.verifyInfo === false) return next();

    const { username } = req.body;
    const query = `SELECT * FROM users WHERE username=$1`
    const values = [username];

    db.query(query, values)
        .then(data => {
            if (data.rows.length <= 0) {
                res.locals.loginSuccess = false;
                res.locals.finalResponse = {};
                return next();
            }

            res.locals.allUserInfo = data.rows[0]
            return next();

        }).catch(err => {
            next({
                log: `Error in getUserInfoByUsername when executing query to DB: ${err}`
            })
        })
}

usersController.encryptPassword = (req, res, next) => {
    let { password } = req.body;
    let saltRounds = 10
    bcrypt.hash(password, saltRounds)
        .then(hashPassword => {
            req.body.password = hashPassword;
            return next();
        }).catch(err => {
            return next({
                log: `Error hashing password in encryptPassword ${err}`
            })
        })
}


usersController.verifyPassword = (req, res, next) => {
    if (res.locals.loginSuccess === false) return next();
    let { password } = req.body;


    bcrypt.compare(password, res.locals.allUserInfo.password)
        .then(boolean => {
            if (!boolean) {
                res.locals.loginSuccess = false;
                res.locals.finalResponse = {};
                return next();
            }

            return next();
        }).catch(err => {
            return next({ log: 'Error when comparing passwords in verifyPassword' })
        })

}

usersController.insertUserIntoUsers = (req, res, next) => {
    const { username, email, password, firstName, lastName } = req.body;
    const query = 'INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5)'
    const values = [username, email, password, firstName, lastName];

    db.query(query, values)
        .then(data => {
            res.locals.verifyInfo = true;
            return next();
        }).catch(err => {
            res.locals.verifyInfo = false;
            res.locals.finalResponse = { err: 'username or email exist' }
            return next();
        })

}

usersController.constructResponse = (req, res, next) => {
    if (res.locals.verifySession === false ||
        res.locals.loginSuccess === false ||
        res.locals.verifyInfo === false) return next();

    const { id: userId, first_name: firstName, last_name: lastName, email, username } = res.locals.allUserInfo;
    const { groupIds } = res.locals;

    const response = {
        userId,
        groupIds,
        firstName,
        lastName,
        email,
        username
    }

    res.locals.finalResponse = response;
    return next();
}


//ROUTE FOR ADDING A USER TO A GROUP
// usersController.addToGroup = async (req, res, next) => {};

//ROUTE FOR DELETING A USER FROM A GROUP
// usersController.removeFromGroup = async (req, res, next) => {};

module.exports = usersController;
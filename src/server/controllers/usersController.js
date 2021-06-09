//IMPORT MODELS FILE
const db = require('../models/models.js')

const usersController = {};


usersController.verifySessionCookie = (req, res, next) => {

    // if (!res.cookie.ssid) {
    //     res.locals.verifiedSession = false;
    //     res.locals.finalResponse = {};
    //     return next();
    // }
    //need to change to req.cookies
    const { ssid } = req.body
    //console.log("FROM REQ BODY in VerifySessionCookie: ", ssid)
    const query = 'SELECT user_id AS userid FROM sessions WHERE ssid=$1'
    const values = [ssid];


    db.query(query, values)
    .then(ssid => {
        console.log("FROM DB in verifySessionCookie: ", ssid.rows)
        if (ssid.rows.length <= 0) {
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
    if (res.locals.verifySession === false || res.locals.loginSuccess === false) return next();

        const ssid = Math.floor(Math.random() * 100000);

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
    if (res.locals.verifySession === false || res.locals.loginSuccess === false) return next();
    console.log('IN setCookie')
    res.cookie('ssid', res.locals.ssid, {httpOnly: true});
    return next();
}

usersController.addSessionToDB = (req, res, next) => {
    if (res.locals.verifySession === false || res.locals.loginSuccess === false) return next();
    const { ssid } = res.locals;
    const { id: userId } = res.locals.userInitialData;
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
        .then(data=> {
            if (data.rows.length <= 0) {
                return next({
                    log: 'User not in the Database in getUserInfo',
                })
            }

            res.locals.userInitialData = data.rows[0];
            return next();
            
        }).catch(err => {
            next({
                log: `Err getting User info from UsersTable in getUserInfo: ${err}`
            })
        })
 
}

usersController.getGroupsFromUserID = (req, res, next) => {
        if (res.locals.verifySession === false || res.locals.loginSuccess === false) return next();
        const { id: userId } = res.locals.userInitialData;

        const query = 'SELECT group_id FROM users_groups WHERE user_id=$1'
        const values = [userId];
        db.query(query, values)
            .then(data => {
                // console.log(data.rows)
                const groupIds = data.rows.map(object => object.group_id)
                console.log('GROUP IDS IN GETGROUPSFROMUSERID: ', groupIds)
                res.locals.groupIds = groupIds;
                return next();
            }).catch(err => {
                return next({
                    log: `Error in getGroupsFromUserID when executing query: ${err}`
                })
            })


}

usersController.getUserInfoByUsername = (req, res, next) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username=$1`
    const values = [username];

    db.query(query, values)
        .then(data => {
            console.log(data.rows)
            if (data.rows.length <= 0) {
                res.locals.loginSuccess = false;
                res.locals.finalResponse = {};
                return next();
            }

            if (data.rows[0].password !== password) {
                res.locals.loginSuccess = false;
                res.locals.finalResponse = {};
                return next();
            }
            const { id, first_name, last_name, email, username } = data.rows[0];
            res.locals.loginSuccess = true;
            res.locals.userInitialData = {
                id,
                first_name,
                last_name,
                email,
                username
            }
            return next();
        }).catch(err => {
            next({
                log: `Error in getUserInfoByUsername when executing query to DB: ${err}`
            })
        })
}

usersController.insertUserIntoUsers = (req, res, next) => {
    const { username, email, password, firstName, lastName } = req.body;
    const query = 'INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5)'
    const values = [username, email, password, firstName, lastName];

    db.query(query, values)
        .then(data => {
            return next();
        }).catch(err=> {
            return next({
                log: `Error in insterUserIntoUsers when executing query: ${err}`
            })
        })

}

usersController.constructResponse = (req, res, next) => {
    if (res.locals.verifySession === false || res.locals.loginSuccess === false) return next();

    const { id: userId, first_name: firstName, last_name: lastName, email, username  } = res.locals.userInitialData;
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


module.exports = usersController;
const db = require('../models');

const progressController = {};

// 
//CONTROLLER FOR GETTING PROGRESS ITEMS
progressController.progressItems = async (req, res, next) => {
  try {

    //Get the userId to search database with 
    const { userId } = req.query;
    //Form the search query -> attach to a var.
    const query = 'SELECT * FROM progress WHERE user_id=$1';
    //Assign value-var.
    const value = [userId];
    //Make query with both vars.
    const data = await db.query(query, value);
    //Process response into rows
    const rows = data.rows;
    //Create obj -> form data into desired shape
    const obj = {};
    rows.forEach(item => {
      console.log(item);
    });
    //Send it along attached to res.locals
    res.locals = obj;
    //Return next
    return next();

  } catch(error) {
    return next({
      log: `Error in progressController.progressItems: ${error}`,
      message: 'Error getting progress items'
    });
  }
};

//CONTROLLER FOR CREATING NEW PROGRESS ITEMS
progressController.createProgress = async (req, res, next) => {
  try {

    //Get the userId to search database with progress info from body
    const { userId } = req.params;
    const { progress_type_id, company, comment } = req.body;
    //Form the search query -> attach to a var.
    const query = 'INSERT INTO progress (user_id, progress_type_id, company, comments) VALUES ($1, $2, $3, $4)';
    //Assign value-var.
    const value = [userId, progress_type_id, company, comment];
    //Make query with both vars.
    const data = await db.query(query, value);
    //Process response into rows
    const rows = data.rows;
    //Create obj -> form data into desired shape
    const obj = {};
    //Send it along attached to res.locals
    res.locals = obj;
    //Return next
    return next();

  } catch(error) {
    return next({
      log: `Error in progressController.createProgress: ${error}`,
      message: 'Error creating new progress items'
    });
  }
};

//CONTROLLER FOR DELETING NEW PROGRESS ITEMS 
progressController.deleteProgress = async (req, res, next) => {
  try {

    //Get the userId to search database with progress info from body
    const { progressId, userId } = req.params;
    //Form the search query -> attach to a var.
    const query = 'DELETE FROM progress WHERE id=$1 AND user_id=$2';
    //Assign value-var.
    const value = [progressId, userId];
    //Make query with both vars.
    const data = await db.query(query, value);
    //Process response into rows
    const rows = data.rows;
    //Create obj -> form data into desired shape
    const obj = {};
    //Send it along attached to res.locals
    res.locals = obj;
    //Return next
    return next();

  } catch(error) {
    return next({
      log: `Error in progressController.deleteProgress: ${error}`,
      message: 'Error deleting progress items'
    });
  }
};

//CONTROLLER FOR UPDATING NEW PROGRESS ITEMS
progressController.updateProgress = async (req, res, next) => {
  try {

    //Get the userId to search database with progress info from body
    const { progressId } = req.params;
    const { progress_type_id, company, comments } = req.body;
    //Form the search query -> attach to a var.
    const query = 'UPDATE progress SET progressId = $1, progress_type_id = $2, company = $3, comments = $4';
    //Assign value-var.
    const value = [progressId, progress_type_id, company, comments];
    //Make query with both vars.
    const data = await db.query(query, value);
    //Process response into rows
    const rows = data.rows;
    //Create obj -> form data into desired shape
    const obj = {};
    //Send it along attached to res.locals
    res.locals = obj;
    //Return next
    return next();

  } catch(error) {
    return next({
      log: `Error in progressController.updateProgress: ${error}`,
      message: 'Error updating progress items'
    });
  }
};


module.exports = progressController;
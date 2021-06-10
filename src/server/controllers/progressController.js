const db = require('../models/models');


const progressController = {};



//CONTROLLER FOR GETTING PROGRESS ITEMS
progressController.progressItems = async (req, res, next) => {
  try {
    const { userId } = req.query;
    
    const query = `
    SELECT p.*, pt.type_name, pt.type_points
    FROM progress p 
      JOIN progress_types pt ON p.progress_type_id=pt.id 
    WHERE user_id IN ($1) 
      AND timestamp > CURRENT_DATE - 7`;
    const value = [userId];
    const queryToDB = await db.query(query, value);
    const data = queryToDB.rows;
    res.locals.data = data;

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
    const { userId } = req.params;
    const { progress_type_id, company, notes } = req.body;
    
    const query = 'INSERT INTO progress (user_id, progress_type_id, company, notes) VALUES ($1, $2, $3, $4) RETURNING *';
    const value = [userId, progress_type_id, company, notes];
    const data = await db.query(query, value);

    const progressItem = data.rows;
    res.locals.progressItem = progressItem;
 
    return next();

  } catch(error) {
    return next({
      log: `Error in progressController.createProgress: ${error}`,
      message: 'Error creating new progress items'
    });
  }
};



//CONTROLLER FOR RETREIVING PROGRESS ITEM BY PROGRESS ID
progressController.addNameAndPoints = async (req, res, next) => {
  try {
    const { progress_type_id } = res.locals.progressItem[0];

    const query = 'SELECT pt.type_name, pt.type_points FROM progress_types pt WHERE id IN ($1)';
    const value = [progress_type_id];
    const data = await db.query(query, value);
    
    const progressItemInfo = data.rows[0];
    const combinedObj = {
      ...res.locals.progressItem[0], 
      progressType: progressItemInfo.type_name,
      points: progressItemInfo.type_points
    }
    console.log('Total Progress item: ', combinedObj);
    res.locals.progressItem = combinedObj;
    
    return next();

  } catch(error) {
    return next({
      log: `Error in progressController.addNameAndPoints: ${error}`,
      message: 'Error creating new progress items'
    });
  }
};



//CONTROLLER FOR DELETING NEW PROGRESS ITEMS
//INCOMPLETE
progressController.deleteProgress = async (req, res, next) => {
  try {
    const { progressId } = req.params;
    
    const query = 'DELETE FROM progress WHERE id=$1 RETURNING *';
    const value = [progressId];
    const data = await db.query(query, value);
    
    const progressItem = data.rows;
    res.locals.progressItem = progressItem;


    return next();

  } catch(error) {
    return next({
      log: `Error in progressController.deleteProgress: ${error}`,
      message: 'Error deleting progress items'
    });
  }
};



//CONTROLLER FOR UPDATING NEW PROGRESS ITEMS
//INCOMPLETE
progressController.updateProgress = async (req, res, next) => {
  try {
    const { progressId } = req.params;
    const { progress_type_id, company, notes } = req.body;
    
    const query = 'UPDATE progress SET progress_type_id = $2, company = $3, notes = $4 WHERE id=$1 RETURNING *';
    const value = [parseInt(progressId), progress_type_id, company, notes];
    const data = await db.query(query, value);
    console.log(data)

    const progressItem = data.rows;
    console.log('progressItem: ', progressItem)
    res.locals.progressItem = progressItem;
    
    return next();

  } catch(error) {
    return next({
      log: `Error in progressController.updateProgress: ${error}`,
      message: 'Error updating progress items'
    });
  }
};


module.exports = progressController;
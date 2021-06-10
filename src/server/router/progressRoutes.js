const express = require('express');

const router = express.Router();

const progressController = require('../controllers/progressController');

//ROUTE FOR GETTING PROGRESS ITEMS (GET) - /api/progress/
router.get('/',
  progressController.progressItems,
  (req, res) => {
    console.log('Entered /progress/ - Got progress items');
    res.status(200).json({ progress: res.locals.data });
  }
);

//ROUTE FOR CREATING NEW PROGRESS ITEMS (POST) - /api/progress/:userID
router.post('/:userId',
  progressController.createProgress,
  progressController.addNameAndPoints,
  (req, res) => {
    console.log('Entered /progress/ - Created new item');
    console.log(res.locals.progressItem);
    res.status(200).json(res.locals.progressItem);
  }
);

//ROUTE FOR DELETING NEW PROGRESS ITEMS (DELETE) - /api/progress/:progressID
router.delete('/:progressId',
  progressController.deleteProgress,
  progressController.addNameAndPoints,
  (req, res) => {
    console.log('Entered /progress/ - Deleted new item');
    res.status(200).json(res.locals.progressItem);
  }
);

//ROUTE FOR UPDATING NEW PROGRESS ITEMS (PUT) - /api/progress/:progressID
router.put('/:progressId',
  progressController.updateProgress,
  progressController.addNameAndPoints,
  (req, res) => {
    console.log('Entered /progress/ - Updated new item');
    console.log('res.locals.progressItem: \n', res.locals.progressItem);    
    res.status(200).json(res.locals.progressItem);
  }
);


module.exports = router;
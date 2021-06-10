const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT ? process.env.PORT : 3000;

//Create the routes to tie the client-side JavaScript events to the appropriate database functions
//ADD ROUTES HERE
const usersRoutes = require('./router/usersRoutes.js');
const progressRoutes = require('./router/progressRoutes.js');
const groupsRoutes = require('./router/groupsRoutes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, './assets')));

//  >>  FETCH REQUEST TEST/ FLOW TEST  <<
app.use((req, res, next) => {
  console.log(`
  ***** FLOW TEST *****\n
  METHOD: ${req.method}\n
  URL: ${req.url}\n`);
  return next();
});

//Route handlers
app.use('/api/users', usersRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/groups', groupsRoutes);

//Serve HTML and bundled JS in production
if (process.env.NODE_ENV === "production") {
  app.use('/dist', express.static(path.join(__dirname, '../../dist')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  });
}

//Bad route handler
app.use('*', (req, res) => {
  res.sendStatus(404);
});

//Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Unknown Express middleware occured!',
    status: 500,
    message: {err: 'Oops, something went wrong.'}
  };

  err = Object.assign(defaultErr, err);

  console.log(err.log);
  res.status(err.status).json(err.message);
});

//Start server
module.exports = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})

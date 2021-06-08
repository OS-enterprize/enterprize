const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT ? process.env.PORT : 3000;

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
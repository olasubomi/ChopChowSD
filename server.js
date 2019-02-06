const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname,'client/build' )));

// on enetering landing page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
  




app.listen(port, () => console.log(`Listening on port ${port}`));
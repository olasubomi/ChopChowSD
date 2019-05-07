const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const config = {
  host: 'ec2-50-19-127-115.compute-1.amazonaws.com',
  user: 'pvahqtecafcvqh',
  database: 'd94gc5o202v7gd',
  password: '7ee85f93c9a94e7841ff2cd9e4cc4ce1e98bd6496fe625811d13bdb59fde98ad',
  port: 5432,
  ssl: true
};


const pool = new Pool(config);
router.get('/test', (req, res, next) => {
  //console.log("Attempt to Starts db func");
  // Get a Postgres client from the connection pool
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
   
    console.log("Comes in here for once");
    values = ["1", "Ola Awokoya"];
    client.query(`INSERT INTO admin (id, name)
VALUES ($1, $2)`, values, function (err, rows, fields) {
      if (err) {
        console.log('Connection result error' + err);
      } else {
        console.log("------------NO ERROR")
      }
    })


    values = [req.params.name, req.params.sys_size];
    // SQL Query > Select Data
    console.log("Gets in page savings route, now querying for chart and customer");
    client.query(`SELECT * FROM admin`)
      .then(result => {
        res.send(result.rows);
      })
      .catch(e => console.error('querying error', e.stack))
      .then(() => release())

  })
})


module.exports = router;
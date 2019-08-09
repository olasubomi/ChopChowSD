const { allData } = require('./AllData');
const { list } = require('./db_buildSchema')
module.exports = (req, res) => {
   new list(allData)
      .save()
      .then(response => {

         res.json.bind({ response: response, status: "ok" })


      }).catch(error => res.status(500).json({ status: 500, msg: "Server error" }));

}


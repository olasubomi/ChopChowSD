const { allData } = require('./AllData');
const { list } = require('./db_buildSchema')
console.log(55555555555555555);
module.exports = (req, res) => {
   console.log(4444444444);
   new list(allData)
      .save()
      .then(response => {
         console.log(22222222222222,response);
         res.json.bind({ response: response })
      })
      .catch(error => res.status(500).json({ status: 500, msg: "Server error" }));
      // .catch(err=>console.log(err)
      )
}


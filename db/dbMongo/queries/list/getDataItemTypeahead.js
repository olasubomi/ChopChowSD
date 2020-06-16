const { list } = require("../../config/db_buildSchema");
module.exports = (req, res) => {
  const { option } = req.params;
  list.find({ product_name: option }).then((result) => {
    res.send({
      data: result,
    });
  });
};

// file potentially not used

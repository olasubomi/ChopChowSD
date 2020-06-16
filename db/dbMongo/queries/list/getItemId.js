const { list } = require("../../config/db_buildSchema");
module.exports = (req, res) => {
  const { idItem } = req.params;
  list.find({ id: idItem }).then((result) => {
    res.send({
      data: result,
    });
  });
};

// file potentially not used

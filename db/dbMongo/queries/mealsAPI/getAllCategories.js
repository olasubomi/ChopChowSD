const { all_meal_categories } = require("../../config/db_buildSchema");
exports.getAllCategories = (req, res) => {
  return all_meal_categories
    .find()
    .then((categoryResp) => {
      console.log("Successfully gets all categories");
      res.send({   data: categoryResp,  });
    })
    .catch(() => ({
      code: 500,
      msg: "sorry , found Inernal server error when getting all categories",
    }));
};

const { suggested_meals } = require("../../config/db_buildSchema");
exports.getSuggestedMeals = (req, res) => {
  return suggested_meals
    .find()
    .then((resMeals) => {
      // console.log(resMeals);
      res.send({
        data: resMeals,
      });
    })
    .catch(() => ({ code: 500, msg: "sorry , found Inernal server error when getting suggested meals" }));
};

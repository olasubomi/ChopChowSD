const { meal_images } = require("../../config/db_buildSchema");
exports.getSuggestedMealImages = (req, res) => {
  return meal_images
    .find()
    .then((resMeals) => {
      console.log("Successfully gets all suggested meal images");
      res.send({
        data: resMeals,
      });
    })
    .catch(() => ({ code: 500, msg: "sorry , found Inernal server error when getting suggested meal images" }));
};

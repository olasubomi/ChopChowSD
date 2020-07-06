const { suggested_meals } = require("../../config/db_buildSchema");

module.exports = (req, res) => {
  const { suggestedMealID } = req.params;
    console.log("suggestedMealID: ", suggestedMealID);
    suggested_meals.findByIdAndRemove({_id: suggestedMealID}).then(() => {
        res.send({ data: "item deleted", });
    })
    .catch(() =>
        next({code: 500,  msg:"sorry , found Inernal server error when deleting items in grocery list",
    })
    );
};

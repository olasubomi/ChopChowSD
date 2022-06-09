const { suggested_meals, meals } = require("../../config/db_buildSchema");
const mongoose = require('mongoose');

exports.sendMealtable = (req, res) => {
    console.log("Comes in send meal data handler");
    const data_ids = req.body;
    id_data = [];
    for (var i = 0; i < data_ids.length; i++) {
        id_data.push(mongoose.Types.ObjectId(data_ids[i]));
    }

    const flag = 0;
    suggested_meals.find({ '_id': { $in: id_data } }).then((docs) => {
        let mealData = []; 
        docs.forEach((doc) => {
            console.log(doc);
            mealData.push({
                mealName: doc.mealName,
                mealImage: doc.mealImage,
                mealImageName: doc.mealImageName,
                prepTime: doc.prepTime,
                cookTime: doc.cookTime,
                intro: doc.intro,
                formatted_ingredient: doc.formatted_ingredient,
                stepSlides : doc.stepSlides,
                chef: doc.chef,
                categories: doc.categories,
                kitchenUtensils: doc.kitchenUtensils,
                tips:doc.tips,
                servings: doc.servings,
                ImageOrVideoContent1: doc.ImageOrVideoContent1,
                ImageOrVideoContent2: doc.ImageOrVideoContent2,
                ImageOrVideoContent3: doc.ImageOrVideoContent3,
                ImageOrVideoContent4: doc.ImageOrVideoContent4,
                ImageOrVideoContent5: doc.ImageOrVideoContent5,
                ImageOrVideoContent6: doc.ImageOrVideoContent6,
                // instructions: doc.instructions,
                // label: doc.label,
                // product_slider: doc.product_slider,
                // display: doc.display
            });
        });

        meals.create(mealData).then(docs => {
            console.log("Succesfully send to meal table. : ", docs);
            suggested_meals.remove({'_id': { $in: id_data}}).then(() => {
                console.log("deleted sucess");
                res.status(200).send(JSON.stringify({ msg: 'Succesfully send to meal table.', done: true }))
            });
        }).catch((e) => {
            console.log(e);
            res.status(500).send(JSON.stringify({ msg: 'Failed to send data' }))
        });
    }).catch((e) => {
        console.log(e);
        res.status(404).send(JSON.stringify({ msg: 'Data Not Found' }))
    });

};

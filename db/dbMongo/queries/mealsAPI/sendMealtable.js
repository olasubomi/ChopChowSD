const { suggested_meals, meals } = require("../../config/db_buildSchema");
const mongoose = require('mongoose');

exports.sendMealtable = (req, res) => {
    const data_ids = req.body;
    id_data = [];
    for (var i = 0; i < data_ids.length; i++) {
        id_data.push(mongoose.Types.ObjectId(data_ids[i]));
    }

    const flag = 0;
    suggested_meals.find({ '_id': { $in: id_data } }).then((docs) => {
        let mealData = []; 
        docs.forEach((doc) => {
            mealData.push({
                categories: doc.categories,
                instructions: doc.instructions,
                label: doc.label,
                mealImage: doc.mealImage,
                readTime: doc.readTime,
                cookTime: doc.cookTime,
                intro: doc.intro,
                newer_ingredient_format: doc.newer_ingredient_format,
                servings: doc.servings,
                product_slider: doc.product_slider,
                display: doc.display
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

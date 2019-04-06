import React, { Component } from 'react';




class ProductSection extends Component {

    meals = [
        {
            id: 1,
            store: "Lizy Gidy",
            imageSrc: '/images/Garri.jpg',
            readTime: "2 mins read",
            cookTime: "2 mins to prepare",
            intro: "Garri (African cereal) is a populous snack-meal in Western African region. "+
            "It is made from cassava and can be drink by soaking in cold water or eaten as meal by soaking in hot water till its solid.",
            ingredients: ["Garri", "Water", "Sugar"],
            new_ingredient:{
                "Garri":{
                servings:{
                    quantitiy: 1,
                    measurements: "Cup(s)"
                }},
                "Water":{
                servings:{
                    quantitiy: 1,
                    measurements: "Cup(s)"
                }},
                "Sugar":{
                    servings:{
                        quantitiy: 1,
                        measurements: "Spoon(s)"
                    }}
              
            },
            products: ["Garri ", "Sugar ", "Water " ],
            quantity:[1,2,1],
            measurements:["Cup(s)","Cup(s)","Spoon(s)"],
            instructions: ["Mix Garri and Sugar in a bowl", "Add ice, water and groundnuts as preffered", "Enjoy!"],
            servings: 1,
            display: false
        },
        {
            id: 2,
            label: "Jollof Rice",
            imageSrc: "/images/Jollof.jpg",
            readTime: "4 mins read",
            cookTime: "45 mins to prepare",
            intro: "Jollof rice is a common delicacy that is enjoyed in the Western Africa region."+
            "Jollof rice a.k.a “One pot” in Benachin, is a delicious delicacy that can be enjoyed without the need of a side-dish. "+
            " Jollof rice is a good source for carbohydrate, starch, fibers and traces of protein depending on the in the ingredients. "+
            "Cooking jollof rice is often considered as a work of art due to the many styles and techniques and taste as good as next day left-over. "+
            "Chop-Chow guarantees one of the best methods in Cooking Jollof rice. Chow!",
            ingredients: ["Rice- 3 Cups", "Tomatoes x 6", "Onion x 2"],
            products: ["Rice ", "Tomatoes ", "Onions "],
            instructions:[ "Tomato , Onion Tatashe, Rodo Blended in Blender",
            "Vegetable Oil + Palm Oil, Low Heat in Pan",
            "Add onions to Pan", "Add Tomato Paste", "Add Powdered Ginger, Garlic and Curry",
            "Add Blended Tomatoes mix (If too thick, add water)","Add seasoning, Maggi (Chicken Flavor), Salt",
        "For Jollof Rice, add Bay Leaves."],
            display: true
        }
    ]
        render() {

            return (
                <div>                    
                    <div id="title"><b>Our Products</b></div>


                </div>
            );
        }
}

export default ProductSection;
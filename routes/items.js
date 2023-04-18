const { Item, validate } = require("../model/item");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const name = await Item.findOne({ name: req.body.name });
    const store = await Item.findOne({ store: req.body.store });

    if (name && store) return res.status(400).send("This Item Already Exist!");

    let item = new Item({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      store: req.body.store,
    });
    item = await item.save();
    res.send({ message: "Item Created Successfully", status: 200, data: item });
  } catch (error) {
    console.log(error);
    res.end(error);
  }
});

//router.put("/:id", async (req, res) => {
//  const { error } = validate(req.body);
//  if (error) return res.status(400).send(error.details[0].message);

//  const genre = await Genre.findById(req.body.genreId);
//  if (!genre) return res.status(400).send("Invalid genre.");

//  const movie = await Movie.findByIdAndUpdate(
//    req.params.id,
//    {
//      title: req.body.title,
//      genre: {
//        _id: genre._id,
//        name: genre.name,
//      },
//      numberInStock: req.body.numberInStock,
//      dailyRentalRate: req.body.dailyRentalRate,
//    },
//    { new: true }
//  );

//  if (!movie)
//    return res.status(404).send("The movie with the given ID was not found.");

//  res.send(movie);
//});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndRemove(req.params.id);

    if (!item)
      return res.status(404).send("The item with the given ID was not found.");

    res.status(200).send("This item has been deleted successfully");
  } catch (error) {
    console.log(error);
    res.end(error);
  }
});

router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item)
    return res.status(404).send("The Item with the given ID was not found.");

  res.status(200).send(item);
});

module.exports = router;

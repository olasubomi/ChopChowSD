const { Ingredient } = require('../model/ingredient')

const saveIngredient = async (payload) => {
    try {
        const ingredient = new Ingredient(payload)
        return await ingredient.save();
    } catch (e) {
        console.log(e)
    }
}

const findIngredient = async (filter) => {
    try {
        return await Ingredient.findOne(filter)
    } catch (error) {
        console.log(error)
    }
}


const getAllIngredient = async (page, filter) => {
    try {
        let getPaginate = await paginate(page, filter)

        const status = filter?.status === 'all' ? { status: filter.status } : {}

        const resp = await Ingredient
            .find(status)
            .limit(getPaginate.limit)
            .skip(getPaginate.skip)

        return { ingredient: resp, count: getPaginate.docCount };

    } catch (error) {
        console.log(error)
    }
}


const updateIngredient = async (payload, ingredientId) => {
    try {
        return await Ingredient.findByIdAndUpdate(
            { _id: ingredientId },
            { $set: { ...payload } },
            { returnOriginal: false }
        )
    } catch (e) {
        console.log(e)
    }
}


const deleteIngredient = async (ingredientId) => {
    try {
        return await Ingredient.findByIdAndDelete(ingredientId)
    } catch (error) {
        console.log(error)
    }
}

const paginate = async (page, filter) => {
    const limit = parseInt(filter.limit) || 10;

    let skip = parseInt(page) === 1 ? 0 : limit * page;
    delete filter.limit;

    const docCount = await Ingredient.countDocuments();

    if (docCount < skip) {
        skip = (page - 1) * limit;
    }
    return { skip, limit, docCount };
}

const createNewIngredient = async (payload) => {
    try {
        const checkIfIngredientExist = await findIngredient({ item_name: payload.item_name })

        if (checkIfIngredientExist) {
            return { ingredient: checkIfIngredientExist, message: "Ingredient already exist" }
        } else {
            const newIngredient = await saveIngredient(payload)
            return { ingredient: newIngredient }
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    saveIngredient,
    getAllIngredient,
    updateIngredient,
    deleteIngredient,
    findIngredient,
    createNewIngredient
}
let data = {};
let dbMongo = mongoose.connection;
const {getDataCustomer} = require('../../dbPostgress/queries/getDataCustomer')
getDataCustomer.then((result) => {
    console.log(result);
    data = result.rows;
}).catch((err) => {
    console.log(err);
    
});
console.log(data);
dbMongo.grocery_listItem.find({_id: data.grocery_listItem_id});

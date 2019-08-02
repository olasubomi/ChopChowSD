const db_connection = require('../../../db/db_connection.js');
const getCustomer = (grocery_list_id) => db_connection.query('SELECT * FROM public.customer WHERE public.customer .grocery_list_id = $1', [grocery_list_id]);
module.exports= getCustomer;


const dbconnection = require('../../config/db_connection');

exports.addList = ( idItem,valueProductName,valueProductImage,valueProductPrice,valueProductSize) => {
  const sql = {
    text: 'INSERT INTO list  (id,product_name,product_image,product_price,sizes)VALUES ($1,$2,$3,$4,$5) RETURNING * ',
    values: [idItem,valueProductName,valueProductImage,valueProductPrice,valueProductSize],
  };
  return dbconnection.query(sql);
};

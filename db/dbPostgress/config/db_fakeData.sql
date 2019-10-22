INSERT INTO
  list (
    id,
    product_name,
    product_image,
    product_price,
    sizes,
    price_per_ounce
  )
VALUES
  (
    1,
    'Ijebu Garri',
    'garri.jpg',
    8.99,
    '50lbs',
    null
  ),(
    2,
    'Brown Beans',
    'beans.jpg',
    12.00,
    '2 lbs',
    3.2
  ),(
    3,
    'Honey Beans',
    'beans.jpeg',
    12.00,
    '2 lbs',
    3.2
  ),(
    4,
    'Spinach',
    'spinach.jpeg',
    2.99,
    '0.5lbs',
    null
  ),(
    5,
    'Kale',
    'kale.jpg',
    2.99,
    '0.5lbs',
    null
  ),(
    6,
    'Oregano',
    'oregano.jpg',
    1.00,
    '1lbs',
    null
  ),(
    7,
    'Squash Potatoes',
    'squash_poatoes.jpeg',
    8.99,
    '50lbs',
    null
  ),(
    8,
    'Water',
    'water.jpeg',
    8.99,
    '50lbs',
    null
  ),(
    9,
    'Plantain Chips',
    'plantain_chips.jpg',
    12.00,
    '2 lbs',
    3.2
  ),(
    10,
    'Cashews',
    'cashews.jpg',
    12.00,
    '2 lbs',
    3.2
  ),(
    11,
    'Peanuts',
    'peanuts.jpeg',
    8.99,
    '50lbs',
    null
  ),(
    12,
    'Watermelon',
    'watermelon.jpg',
    12.00,
    '2 lbs',
    3.2
  ),(
    13,
    'Pineapple',
    'pineapple.jpg',
    12.00,
    '2 lbs',
    3.2
  );
INSERT INTO
  customer (
    id,
    firstname,
    lastname,
    email,
    password,
    phonenumber,
    street,
    city,
    zipcode,
    ipsid
  )
VALUES
  (
    1,
    'alaa',
    'badra',
    'alaabadra4@gmail.com',
    '$2a$05$qLXGE2h8cI2xGDIhVJvuneIOADk89863sqvm.v/tdxqyk3PXs8RXW'
,
    282,
    'salah',
    'gaza',
    12334,
    4566
  ),(
    2,
    'Olasubomi',
    'Awokoya',
    'olasubomi.awokoya@hotmail.com',
    '$2a$05$It8ks6FUyy2nkuyd.l3FZOnhHitAvgcczUpwEXI1h7DNWCWj33ToK',
    234,
    'areha',
    'american',
    12334,
    4566
),(
    3,
    'Ola',
    'Awokoya',
    'iamsubomi@gmail.com',
    '$2a$05$fdi/EcpLum8N6m0MMXoTv.awoVUaSzpM8fcIIPG.QCfajEw7BXqtG',
    482,
    'salah',
    'gaza',
    12334,
    4566
);
  INSERT INTO
  customer_list (
    customer_id,
    list_id
  )
VALUES(
  1,
  1
), (
  2,
  2
), (
  3,
  3

);
INSERT INTO
  admin (id, name)
VALUES
  (1, 'Olasubomi');
INSERT INTO
  supplier (id, storename)
VALUES
  (1, 'Dima');
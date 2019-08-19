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
    '../../../client/build/images/products/garri.jpg',
    8.99,
    '50lbs',
    null
  ),(
    2,
    'Brown Beans',
    '../../../client/build/images/products/beans.jpeg',
    12.00,
    '2 lbs',
    3.2
  ),(
    3,
    'Honey Beans',
    '../../../client/build/images/products/beans.jpeg',
    12.00,
    '2 lbs',
    3.2
  ),(
    4,
    'Spinach',
    '../../../client/build/images/products/garri.jpg',
    2.99,
    '0.5lbs',
    null
  ),(
    5,
    'Kale',
    '../../../client/build/images/products/garri.jpg',
    2.99,
    '0.5lbs',
    null
  ),(
    6,
    'Blueberries',
    '../../../client/build/images/products/beans.jpeg',
    1.00,
    '1lbs',
    null
  ),(
    7,
    'Squash Potatoes',
    '../../../client/build/images/products/potatoes.jpg',
    8.99,
    '50lbs',
    null
  ),(
    8,
    'Water',
    '../../../client/build/images/products/garri.jpg',
    8.99,
    '50lbs',
    null
  ),(
    9,
    'Plantain Chips',
    '../../../client/build/images/products/beans.jpeg',
    12.00,
    '2 lbs',
    3.2
  ),(
    10,
    'Cashews',
    '../../../client/build/images/products/beans.jpeg',
    12.00,
    '2 lbs',
    3.2
  ),(
    11,
    'Peanuts',
    '../../../client/build/images/products/garri.jpg',
    8.99,
    '50lbs',
    null
  ),(
    12,
    'Watermelon',
    '../../../client/build/images/products/beans.jpeg',
    12.00,
    '2 lbs',
    3.2
  ),(
    13,
    'Pineapple',
    '../../../client/build/images/products/beans.jpeg',
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
    ipsid,
    listid
  )
VALUES
  (
    1,
    'alaa',
    'badra',
    'alaabadra4@gmail.com',
    '$2a$05$6Q1VE6DzhS8Z2pBr1VEPv.sM2dWPKacPv9GFC5M1.auGPlbab38aK',
    282,
    'salah',
    'gaza',
    12334,
    4566,
    1
  ),
  (
    2,
    'ala',
    'tare',
    'aa@hotmail.com',
    '$2a$05$xuOTwN1iWrraW7Og7cVAWu00RUpEXg6AV8X3Mz8cIUoQcT952FJ7e',
     234,
    'areha',
    'american',
    12334,
    4566,
    1
  ),  (
    3,
    'alaa',
    'bad',
    'dim@gmail.com',
    '$2a$05$mjKkeAAMAaEsORbu.ZQKQurq4nr3pW3n524uwz9uQBrwLt3iGMAQG',
    482,
    'salah',
    'gaza',
    12334,
    4566,
    2
  ),
  (
    4,
    'ala',
    'tare',
    'bbb@hotmail.com',
    '$2a$05$rZ6MiHZcvdMzVwTyJsyJf.o.CXVgP0xt72NO0JzPL3o4uYtSfgJ9C',
    124,
    'areha',
    'american',
    12334,
    4566,
    2
  ) , (
    5,
    'alaa',
    'badra',
    'algg4@gmail.com',
    '$2a$05$NaOMIHK8COoVXp1xikmcauCal6Cx1K.pTqszE8Gw2RbbgbcjWQ0VO',
    282,
    'salah',
    'gaza',
    12334,
    4566,
    3
  ),
  (
    6,
    'ala',
    'tare',
    'ajkjl@hotmail.com',
    '$2a$05$gjz9fzt2CFQK6Zrhm8vUW.P4fQEz/2K4DfEJvlFGt7Gmb/o1xRg32',
    154,
    'areha',
    'american',
    12334,
    4566,
    3
  ) , (
    7,
    'alaa',
    'badra',
    'kja4@gmail.com',
    '$2a$05$V1KoBQdLmude8L1ZaQbkjux/qcf05Z0/HiPhgdZz7ZZk2Gc4dUa1i',
    787,
    'salah',
    'gaza',
    12334,
    4566,
    5
  ),
  (
    8,
    'ala',
    'tare',
    'axxxa@hotmmmail.com',
    '$2a$05$YatyAOyRB6VRqlWVE3xPY.NvCSMDuMo8V4Dh8/uT8hygqGUVVpKCe',
    157,
    'areha',
    'american',
    12334,
    4566,
    5
  ),  (
    9,
    'alaa',
    'badra',
    'afyya4@gmail.com',
    ' $2a$05$N8bFcn7dxFTo9T3iyuhg7OmyME9NwNCd6EwSJRA62FPRmnzY1QO/q',
    565,
    'salah',
    'gaza',
    12334,
    4566,
    6
  ),
  (
    10,
    'ala',
    'tare',
    'afffa@mail.com',
    '$2a$05$dpziTRD44Dy/P1stEJbfuu086NMHE2481zEAVOpyEB3bDAmhySer2',
    574,
    'areha',
    'american',
    12334,
    4566,
    6
  ),  (
    11,
    'alaa',
    'badra',
    'snssm4@gmail.com',
    '$2a$05$S8/r6KCtDwgvu1un1QgtxuZuNh2IHUm8SY0ZyUsuwapKU3/owa7vS',
    482,
    'salah',
    'gaza',
    12334,
    4566,
    8
  ),
  (
    12,
    'ala',
    'tare',
    'aaaa@il.com',
    '$2a$05$h8anTFmZNXG8mK53XPbhW.E54heHCiszhcPqEFBpdYILIqblS2fD2',
    124,
    'areha',
    'american',
    12334,
    4566,
    13
  ) , (
    13,
    'alaa',
    'badra',
    'sabra4@gmail.com',
    '$2a$05$wvkNaf.YNF7ehwEE1qKncurUM9DjbRFLeAXoXLlM72r3y9Bfr1O9m',
    482,
    'salah',
    'gaza',
    12334,
    4566,
    13
  );
INSERT INTO
  admin (id, name)
VALUES
  (1, 'Olasubomi');
INSERT INTO
  supplier (id, storename)
VALUES
  (1, 'Dima');
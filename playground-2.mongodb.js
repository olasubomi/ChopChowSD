/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('Product_Supply');

// Search for documents in the current collection.
db.getCollection('users')
    .deleteMany(
        {
            email: 'basseyumuks+001@gmail.com'
        }

    )
// .find(
//     {}
// )
// .sort({
//     createdAt: -1
// })
// class CartService {
//     static async createCart(payload) {
//         try {
//             // validate input data with joi
//             //const validate = cartSchema.validate(payload);

//             // if (validate.error) {
//             //     throw {
//             //         message: validate.error.details[0].message,

//             //         path: validate.error.details[0].path[0],
//             //     };
//             // }
//             const userExist = await findUser({ email: payload.email });


//             if (userExist && userExist.isVerified) {
//                 throw {
//                     message: "User already exist",
//                 };
//             }

//             const newUser = await createUser(payload);


//             return {
//                 user: newUser,
//                 message: "User sucessfully registered"
//             };
//         } catch (error) {
//             console.log("caught");
//             throw error;
//         }
//     }
// }
// const UserService = require('../../services/UserService');
// const StoreService = require('../../services/StoreService');

// exports.updateUserTypeToSupplier = async (req, res, next) => {
//     try {
//         // Call the StoreService to create the store
//         const store = await StoreService.createStore(req.body, req.files);
    
//         // Update the user type to "supplier" using the UserService
//         await UserService.updateUserType(req.decoded.id, 'supplier');
            
        
//     }catch (error) {
//         // Handle errors
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }

//     next();
// };

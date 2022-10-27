const { users } = require('../../config/db_buildSchema');
module.exports = async () => {
    const admin = [
        {
            first_name: "Olasubomi",
            last_name: "Awokoya",
            user_type: "App Admin",
            date_joined: new Date(),
            profile_picture: '',
            super_app_admin: true,
            sub_app_admin: false,
            super_store_admin: true,
            optional_store_ids: [],
            sub_store_admin: false,
            username: "Subomi",
            email: "iamsubomi@gmail.com",
            password: "password",
            date_of_birth: new Date("1993-11-28"),
            phone_number: 8583059541,
            food_preferences: [],
            payment_details: null,
            delivery_addresses: [],
            grocery_list: [],
            cart_list: [],
            suggested_meals_from_groceries_list: [],
            suggested_products_for_balanced_diet: [],
            ordered_list: [],
            suggested_meals_by_user: [],
            email_notifications: String,
            database_searches_allowed: null,
            subscription_member: true,
            subscription_orders: [],
            notifications: [],
            ip_ids: [],
            driver_mode_on: false,
            driver_hours: [],
            driver_reviews: null,
            driver_store_affiliations: null,
            location_compatible_device: null,
            driver_orders_picked_up: [], 
            driver_order_regions: [], 
            driver_car_type: "",
            driver_car_color: "",
            driver_car_plate_number: "",
            driver_car_picture: null,
            driver_car_make: "",
            driver_car_model: "",
            driver_car_year: null
        }
    ]

    return users.create(admin)
}
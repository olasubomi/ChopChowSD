
const axios = require('axios');

// Function to verify code using Vonage API
module.exports.sendOTPCode = (code, phoneNumber, client_ref, code) => {
    const apiKey = process.env.VONAGE_KEY
    const apiSecret = process.env.VONAGE_SECRET;

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const data = {
        locale: 'en-us',
        channel_timeout: 180,
        client_ref,
        code,
        brand: 'Chop Chow',
        workflow: [
            {
                channel: 'sms',
                to: phoneNumber
            },
            {
                channel: 'whatsapp',
                to: phoneNumber,
                from: 'your-vonage-whatsapp-number'
            }
        ]
    };

    axios.post('https://api.nexmo.com/v2/verify/', data, {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

// // Example usage of verifyCode function
// const locale = 'es-es';
// const code = 'e4dR1Qz'; // Replace with the actual verification code
// const phoneNumber = '2348105460858'; // Replace with the user's phone number

// verifyCode(locale, code, phoneNumber);

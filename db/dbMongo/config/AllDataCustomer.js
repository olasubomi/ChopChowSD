const { customer } = require('./db_buildSchema');
module.exports = async () => {
    const allDataCustomer = [
        {
            id:1,
            firstname: 'alaa',
            lastname: 'badra',
            email: 'alaabadra4@gmail.com',
            password: '$2a$05$qLXGE2h8cI2xGDIhVJvuneIOADk89863sqvm.v/tdxqyk3PXs8RXW',
            phoneNumber:282,
            street:'salah',
            city:'gaza',
            zipCode:12334,
            ipsid:4566,
        }, {

            id:2,
            firstname: 'Olasubomi',
            lastname: 'Awokoya',
            email: 'olasubomi.awokoya@hotmail.com',
            password: '$2a$05$C2OPWtVFkyH/WBayaDmAduMiFVeHTenP8Cb8PVeWa8C.sSdKKE2O.',
            phoneNumber: 234,
            street:'areha',
            city:'american',
            zipCode:12334,
            ipsid:4566,
        }, {
            id:3,
            firstname: "Ola",
            lastname: 'Awokoya',
            email: 'iamsubomi@gmail.com',
            password: '$2a$05$fdi/EcpLum8N6m0MMXoTv.awoVUaSzpM8fcIIPG.QCfajEw7BXqtG',
            phoneNumber: 482,
            street:'salah',
            city:'gaza',
            zipCode:12334,
            ipsid:4566
        }
    ]

    return customer.create(allDataCustomer)
}

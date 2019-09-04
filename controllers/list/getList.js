// const { list } = require('../../db/dbMongo/config/db_buildSchema')
// const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')
// exports.getList = (req, res) => {
//     const { customerId } = req.params   
//     getDataCustomerId(customerId).then((result) => {
//         console.log(444,result.rows);
//         let arr=[]
//         let data = {};
//         data = result.rows;
//         for(let i =0 ; i<=data.length;i++){
//             console.log(5566,data[1]);

// return list.find({ id: data[i].list_id })
//     .then(resList => {

//         console.log(55555,resList);
//         for(let v=0; v<=resList.length;v++){
//             console.log(2222211,resList);
//             arr.push(resList)
//             console.log(666669,resList);
//             console.log(55522,arr);


//         }
//         // res.send({
//         //     data: resList
//         // })

//      })// data from list that it spcial of this customer

//  .catch(() =>  next({code: 500, msg: 'sorry , found Inernal server error' }));
// }
// })

//  }



// const { list } = require('../../db/dbMongo/config/db_buildSchema')
// const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')
// exports.getList = (req, res) => {
//     const { customerId } = req.params   
//     getDataCustomerId(customerId).then((result) => {
//         let data = {};
//         data = result.rows[0];
//         return list.findOne({ id: data.listid })
//             .then(resList => {
//                 res.send({
//                     data: resList
//                 })

//             })// data from list that it spcial of this customer

//         .catch(() =>  next({ code: 500, msg: 'sorry , found Inernal server error' }));
//     })

// }

const { list } = require('../../db/dbMongo/config/db_buildSchema')
const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')
exports.getList =  (req, res) => {
    const { customerId } = req.params
     getDataCustomerId(customerId).then((result) => {
        console.log(2222, result.rows);
        let data = {};
        let myResult1 = null;
        let aaa = null
        list.find({})
            .then(resultAll => {
                data = result.rows;
                const list_ids = data.map((el) => el.list_id)
                console.log({ list_ids });
                list.find( { id: { $in: list_ids} } )
                    .then(result => {
                        
                        res.send({
                            data:result
                        })
                        // console.log( {res})
                        
                    })
                    .catch(err => console.log(err))
            })
        })
    }













/////////////////////////
// exports.getList = (req, res) => {

// list.find({}).then(i=>{
//     console.log(444,i);
    
// })
// }                // data.map((da)=>{
                //     let daa= da.list_id;
                //     console.log('uuuuuu',daa);
                // })
                // res.map((ee) => {
                //     aaa = ee.id;
                //     console.log('kkkkkkkkkkk', aaa);

                    // list.find({aaa:myResult1}).then((ww)=>{
                    //     console.log(8888,ww);

                    // })


                // })
                // res.map((elem)=>{
                //     console.log(8989,aaa);

                //     let element= elem.id
                //     console.log(2121,element);
                //     // myResult1.map(el=>{
                //     //     console.log(000110101,el);


                //     //     // list.find({element:el}).then(rez=>{
                //     //     //     // console.log(7474,rez);

                //     // // })
                //     // })
                // })
                // res.send({
                //     data: res.filter(function(element) {
                //         // console.log(2222,element.id);

                //         var ids = element.id;
                //         console.log(444,ids);

                //         return ids.filter(function(id) {
                //             console.log(888,id);

                //             return data.indexOf(id) > -1;
                //         }).length === data.length;
                //      })
                // })
                // var x=res.filter(function(element) {
                //     console.log('vvvvvvv',element)
                //     var ids = element.id.split(' '); 
                //     return ids.filter(function(id) {
                //         return data.indexOf(id) > -1;
                //     }).length === data.length;
                //  })
                // console.log(66666,x);

//             })




//     })
// }


// //         // for(let i=0 ; i<=data.length-1;i++){
// //         //     console.log(1414,data[i].list_id);
// //         //     // return list.find()
// //         //      list.find({id:data[i].list_id})
// //         //         .then(resList => {

// //         // // for(let i=0 ; i<=resList.length-1;i++){

// //         //             console.log(3333,resList);
// //         //             myResult.push(resList)
// //         //             // res.end()
// //         //             // res.send({
// //         //             //     data: resList
// //         //             // })
// //         //         // }
// //         //         })// data from list that it spcial of this customer

// //         //     // .catch(() =>  next({ code: 500, msg: 'sorry , found Inernal server error' }));
// //         // }
// //         // console.log('myResul:', myResult)
// //         // res.send({data: myResult})
// //         // // res.end()

// //     })

// // }



// const { list } = require('../../db/dbMongo/config/db_buildSchema')
// const { getDataCustomerId } = require('../../db/dbPostgress/queries/getDataCustomerId')
// exports.getList = (req, res) => {
//     const { customerId } = req.params   
//     getDataCustomerId(customerId).then((result) => {
//         let data = {};
//         data = result.rows;
//         let myArray = [];


//         list.aggregate({ id: { $in: data } })
//             .then(res => console.log('mmmmmmmm', res))
//             .catch(err => console.log(err))



//     })

// }














//         // for(var i=0; i<data.length-1; i++) {
//         //     myArray.push(`id:data[${i}].list_id`)
//         // }
// //             myArray.push(`id:data[${i}].list_id`)
// // console.log('lllllllll', myArray);

//         // return list.find({'$or': {id:data[0].list_id, id:data[1].list_id, id:data[2].list_id}})
//         //     .then(resList => {
//         //         res.send({
//         //             data: resList
//         //         })

//         //      })// data from list that it spcial of this customer

//         //  .catch(() => res.status(500).send({ code: 500, msg: 'sorry , found Inernal server error' }));
//     })
// }
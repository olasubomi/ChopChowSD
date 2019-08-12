const {checkEmail} = require('../../dbPostgress/queries/athuntication/checkEmail');
const {sign} = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
exports.authenticationLogin = (req, res,next) => {
    res.end('done')
    const memberInfo = { ...req.body}
    if(memberInfo){
        checkEmail(memberInfo.email)
        .then((result)=>{
            console.log('result password from database',result.rows[0].password);           
            if(result.rows[0]){
                bcrypt.compare(memberInfo.password,result.rows[0].password,(err,valid)=>{
                    if(err) console.log(err);
                    if(valid){
                        console.log(333333333);                        
                        const {id, email}={...result.rows[0]}
                        const userInfoEnc = {id, email};                        
                        const tokenCustomer =   sign(userInfoEnc,process.env.SECRET);
                        console.log(tokenCustomer);                        
                        const coookie = res.cookie('JWTcustomerId',tokenCustomer,{
                            maxAge: 60 * 60 * 24 * 30,
                            httpOnly: true,
                          });  
                          console.log(coookie);
                          
                          res.status(200).send({ error: null, data: tokenCustomer }); 
                    }else next({ code: 400, msg: 'Check your password ' });
                })
            }else next({ code: 400, msg: 'email does not exist ' });
        })
        .catch(()=>   next  ({ code: 400, msg: 'Ensure you enter validly data in your email ' }))
    }else{
        res.status(401).send(JSON.stringify({msg:'you not authrized in this page'}))
    }
}
    


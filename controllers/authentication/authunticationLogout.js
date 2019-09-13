module.exports=(req,res)=>{
    res.clearCookie();
    res.send({data:'success'})
}

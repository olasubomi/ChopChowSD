exports.isAuthenticated = (req, res, next) => {
  console.log(888888,req);
  
  const { id } = req.userInfoDec;
  if (id) {
    res.send({ success: true, data: id });
  } else {
    res.status(401).send(JSON.stringify({ msg: 'you not authrized in this page' }))
  }
};



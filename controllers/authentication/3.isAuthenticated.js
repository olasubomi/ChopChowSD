exports.isAuthenticated = (req, res, next) => {
  console.log("in isAuthenticated file, decoded is :")
  console.log(req.decoded)
  const { id } = req.decoded;
  if (id) {
    res.send({ success: true, data: id });
  } else {
    res.status(401).send(JSON.stringify({ msg: 'our database indicates you are not authorized on this page. (no user id) ' }))
  }
};
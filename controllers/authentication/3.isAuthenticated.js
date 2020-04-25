exports.isAuthenticated = (req, res, next) => {
  const { id } = req.userInfoDec;
  if (id) {
    res.send({ success: true, data: id });
  } else {
    res.status(401).send(JSON.stringify({ msg: 'our database indicates you are not authorized on this page. (no user id) ' }))
  }
};
const chalk = require('chalk');

exports.isAuthenticated = (req, res, next) => {
  console.log("in isAuthenticated file, decoded is :")
  console.log(req.decoded)
  const { id, username } = req.decoded;
  console.log(chalk.cyan("Request decoded id: ") + id);
  console.log(chalk.cyan("Request decoded username: ") + username);
  if (id) {
    res.send({ success: true, data: id, username: username });
  } else {
    res.status(401).send(JSON.stringify({ msg: 'our database indicates you are not authorized on this page. (no user id) ' }))
  }
};
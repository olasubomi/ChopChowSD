module.exports = (req, res, next) => {
    const { id } = req.userInfoDec;
    if (id) {
      res.send({ success: true, data: id });
    } else {
      next({ code: 401, msg: 'Un Authorized' });
    }
  };
  
  
const RequestIp = require("@supercharge/request-ip");

const reqIpMiddleware = function (req, res, next) {
  req.ip = RequestIp.getClientIp(req);
  console.log(req.ip);
  next();
};

module.exports = reqIpMiddleware;

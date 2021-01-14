const RequestIp = require("@supercharge/request-ip");

const reqIpMiddleware = function (req, res, next) {
  const ip =
    req.headers["HTTP_CF_CONNECTING_IP"] ||
    req.headers["x-real-ip"] ||
    RequestIp.getClientIp(req);
  req.ip = ip;
  next();
};

module.exports = reqIpMiddleware;

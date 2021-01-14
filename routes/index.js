const axios = require("axios");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const ip = req.headers["HTTP_CF_CONNECTING_IP"] || req.ip;

  const geoData = await axios.get(
    "http://ip-api.com/json/" + ip + "?fields=25948159"
  );

  console.log(ip);
  res.render("index", {
    title: "[pxlwrx]",
    data: {
      geodata: JSON.stringify(geoData.data, 0, 2),
      fingerprint: JSON.stringify(req.fingerprint, 0, 2),
    },
  });
});

module.exports = router;

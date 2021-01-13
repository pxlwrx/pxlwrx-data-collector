const axios = require("axios");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const geoData = await axios.get(
    "http://ip-api.com/json/" + ip + "?fields=25948159"
  );

  // console.log("==========================================================");
  // console.log("Hash: ", req.fingerprint.hash);
  // console.log(req.fingerprint);
  // console.log("==========================================================");

  console.log(geoData.data);
  res.render("index", {
    title: "[pxlwrx]",
    data: { geodata: JSON.stringify(geoData.data, 0, 2) },
  });
});

module.exports = router;
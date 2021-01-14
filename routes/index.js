const axios = require("axios");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const geoData = await axios.get(
    "http://ip-api.com/json/" + req.cf_ip + "?fields=25948159"
  );

  console.log(geoData.data);
  res.render("index", {
    title: "[pxlwrx]",
    data: {
      geodata: JSON.stringify(geoData.data, 0, 2),
      fingerprint: JSON.stringify(req.fingerprint, 0, 2),
    },
  });
});

module.exports = router;

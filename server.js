const express = require("express");
const axios = require("axios");
const app = express();

app.get("/api/rates", (req, res) => {
  const { base, currency } = req.query;
  if (!base) {
    return res
      .status(403)
      .json({ error: "Default exchange rate is not included" });
  }
  axios
    .get(
      `https://api.exchangeratesapi.io/latest?base=${base.toUpperCase()}&symbols=${currency.toUpperCase()}`
    )
    .then((result) => {
      const { base, date, rates } = result.data;
      const newDate = new Date().toJSON().slice(0, 10);

      res.status(200).json({
        results: { base, date: newDate, rates },
      });
    });
});

app.use((req, res, next) => {
  return res.status(404).json({ error: "This page is not available" });
});

app.listen(8000);

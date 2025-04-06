require("dotenv").config();
const chapa = require("chapa")(process.env.CHAPA_PUBLIC_KEY);

const ChapaConfig = (req, res) => {
  res.send({ publishableKey: process.env.CHAPA_PUBLIC_KEY });
};

module.exports = { ChapaConfig };

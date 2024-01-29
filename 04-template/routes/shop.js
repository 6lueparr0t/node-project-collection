// const path = require("path");
// const rootDir = require("../util/path");
const express = require("express");
const router = express.Router();

const adminData = require('./admin');

router.get("/", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  const products = adminData.products;
  console.log(products);
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;

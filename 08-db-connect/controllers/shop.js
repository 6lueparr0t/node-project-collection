const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);
  res.render("shop/product-detail", {
    product: product,
    pageTitle: product.title,
    path: "/products",
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};

exports.getCart = async (req, res, next) => {
  const cart = await Cart.getCart();
  const products = await Product.fetchAll();

  const cartProducts = [];
  for (let product of products) {
    const cartProductData = cart.products.find((prod) => prod.id === product.id);
    if (cartProductData) {
      cartProducts.push({ productData: product, qty: cartProductData.qty });
    }
  }
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: cartProducts,
  });
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  await Cart.addProduct(prodId, product.price);
  res.redirect("/cart");
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  await Cart.deleteProduct(prodId, product.price);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

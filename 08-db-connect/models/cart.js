const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static async addProduct(id, productPrice) {
    // Fetch the previous cart
    await fs
      .readFile(p)
      .then((fileContent) => {
        let cart = { products: [], totalPrice: 0 };
        if (fileContent) {
          cart = JSON.parse(fileContent);
        }
        console.log(cart);
        // Analyze the cart => Find existing product
        const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        // Add new product/ increase quantity
        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          updatedProduct.qty = updatedProduct.qty + 1;
          cart.products = [...cart.products];
          cart.products[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id: id, qty: 1 };
          cart.products = [...cart.products, updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        fs.writeFile(p, JSON.stringify(cart)).catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  static async deleteProduct(id, productPrice) {
    await fs
      .readFile(p)
      .then((fileContent) => {
        const updatedCart = { ...JSON.parse(fileContent) };
        const product = updatedCart.products.find((prod) => prod.id === id);
        if (!product) {
          return;
        }
        const productQty = product.qty;
        updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);
        updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

        fs.writeFile(p, JSON.stringify(updatedCart)).catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  static async getCart(cb) {
    let cart = [];
    await fs
      .readFile(p)
      .then((fileContent) => {
        cart = JSON.parse(fileContent);
      })
      .catch((err) => {
        throw err;
      });

    return cart;
  }
};

const Cart = require('./cart');

const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "products.json");
const getProductsFromFile = async () => {
  let products = [];

  await fs
    .readFile(p)
    .then((content) => {
      products = JSON.parse(content);
    })
    .catch((err) => {
      throw err;
    });

  return products;
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    let products = await getProductsFromFile();
    if (this.id) {
      const existingProductIndex = products.findIndex((prod) => prod.id === this.id);
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = this;
      await fs
        .writeFile(p, JSON.stringify(updatedProducts))
        .catch((err) => {
          throw err;
        });
    } else {
      this.id = Math.random().toString();
      products.push(this);
      await fs
        .writeFile(p, JSON.stringify(products))
        .catch((err) => {
          throw err;
        });
    }
  }

  static async deleteById(id) {
    const products = await getProductsFromFile();
    console.log(products);
    const product = products.find(prod => prod.id === id);
    const updatedProducts = products.filter(prod => prod.id !== id);
    fs.writeFile(p, JSON.stringify(updatedProducts)).then(async () => {
      await Cart.deleteProduct(id, product.price);
    });
  }

  static async fetchAll() {
    let products = await getProductsFromFile();
    return products;
  }

  static async findById(id) {
    let products = await getProductsFromFile();
    const product = products.find((item) => item.id === id);
    return product;
  }
};

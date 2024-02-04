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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    let products = await getProductsFromFile();
    products.push(this);
    await fs
      .writeFile(p, JSON.stringify(products))
      .then(() => {})
      .catch((err) => {
        throw err;
      });
  }

  static async fetchAll() {
    let products = await getProductsFromFile();
    return products;
  }
};

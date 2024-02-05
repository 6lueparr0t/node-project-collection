const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    if (this.id) {
      await db
        .execute(
          "UPDATE products SET products.title = ?, products.price = ?, products.imageUrl = ?, products.description = ? WHERE products.id = ?",
          [this.title, this.price, this.imageUrl, this.description, this.id]
        )
        .then(([result]) => console.log(result?.info));
    } else {
      await db
        .execute("INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)", [
          this.title,
          this.price,
          this.imageUrl,
          this.description,
        ])
        .then(([result]) => console.log(result));
    }
    return true;
  }

  static async deleteById(id) {
    await db
      .execute("DELETE FROM products WHERE products.id = ?", [id])
      .then(([result]) => console.log(result));
    return true;
  }

  static async fetchAll() {
    let products = {};
    await db.execute("SELECT * FROM products").then(([items]) => {
      products = items;
    });
    return products;
  }

  static async findById(id) {
    let product = {};
    await db.execute("SELECT * FROM products WHERE products.id = ?", [id]).then(([[item]]) => {
      product = item;
    });
    return product;
  }
};

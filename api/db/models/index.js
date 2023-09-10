const { User, UserSchema } = require("./user.model");
const { Product, ProductSchema } = require("./product.model");
function setUpModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
};

module.exports = setUpModels;

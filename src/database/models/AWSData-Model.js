const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AWSData = new Schema(
  {
    id: { type: Number },
    title: { type: String },
    price: { type: String },
    description: { type: String },
    category: { type: String },
    image: { type: String },
    sold: { type: String },
    dateOfSale: { type: String },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("awsdata", AWSData);

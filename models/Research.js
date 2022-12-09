const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const researchSchema = new Schema(
  {
    resID: {
      type: Number,
    },
    resName: {
      type: String,
    },
    description: {
      type: String,
    },
    name: {
      type: String,
    },
    contact: {
      type: String,
    },
    email: {
      type: String,
    },
  } 
);

const Research = mongoose.model("Research", researchSchema);
module.exports = Research;

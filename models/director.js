const mongoose = require('mongoose');
mongoose.set('debug', true);
const Schema = mongoose.Schema; 

const directorSchema = new Schema(
  {
    name: String,
    age:  Number,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(`Director`, directorSchema);
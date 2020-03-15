const mongoose = require('mongoose');
mongoose.set('debug', true);
const Schema = mongoose.Schema; 

const moviesSchema = new Schema(
  {
    name: String,
    genre: String,
    directorId: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(`Movie`, moviesSchema);
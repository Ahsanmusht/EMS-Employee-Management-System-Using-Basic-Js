const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;

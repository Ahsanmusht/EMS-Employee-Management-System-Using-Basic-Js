const router = require('express').Router();
const Candidate = require('../models/Candidate');

// Get all candidates
router.route('/').get((req, res) => {
  Candidate.find()
    .then((candidates) => res.json(candidates))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Add a candidate
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const party = req.body.party;

  const newCandidate = new Candidate({ name, party });

  newCandidate
    .save()
    .then(() => res.json('Candidate added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Increment votes for a candidate
router.route('/vote/:id').put((req, res) => {
  Candidate.findById(req.params.id)
    .then((candidate) => {
      candidate.votes += 1;
      candidate
        .save()
        .then(() => res.json('Vote added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;

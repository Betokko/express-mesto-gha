const handleError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: err.message });
    return;
  }
  if (err.name === 'Error') {
    res.status(404).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: err.message });
};

module.exports = { handleError };

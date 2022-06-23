const validator = require('validator');

const validateUrl = (url) => {
  if (!validator.isURL(url, { require_protocol: true })) {
    throw new Error('Неправильный формат ссыки');
  }
  return url;
};

module.exports = validateUrl;

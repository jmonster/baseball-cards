const crypto = require('crypto')

module.exports =
  function shaZam (input) {
    return crypto
      .createHash('sha1')
      .update(input)
      .digest('hex')
      .slice(0, 16);
  }

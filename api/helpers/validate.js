const validateBook = data => {
  if (typeof data.name !== 'string') {
    return false;
  }
  if (data.name.trim().length === 0) {
    return false;
  }
  if (typeof data.authorName !== 'string') {
    return false;
  }
  if (data.authorName.trim().length === 0) {
    return false;
  }
  if ('releaseDate' in data) {
    if (typeof data.releaseDate !== 'number') {
      return false;
    }
    if (!new Date(data.releaseDate).getTime() > 0) {
      return false;
    }
  }

  return true;
};

module.exports = validateBook;

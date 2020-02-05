const validateBook = data => {
  if ('name' in data) {
    const { name } = data;
    if (typeof name !== 'string') {
      return false;
    }
    if (name.trim().length === 0) {
      return false;
    }
  }

  if ('authorName' in data) {
    const { authorName } = data;
    if (typeof authorName !== 'string') {
      return false;
    }
    if (authorName.trim().length === 0) {
      return false;
    }
  }

  if ('releaseDate' in data) {
    if (typeof data.releaseDate !== 'number') {
      return false;
    }
    if (!new Date(data.releaseDate).getTime() > 0) {
      return false;
    }
  }
  if ('name' in data || 'authorName' in data || 'releaseDate' in data) {
    return true;
  }

  return false;
};

module.exports = validateBook;

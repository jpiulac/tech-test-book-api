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
  if ('releasedDate' in data) {
    if (typeof data.releasedDate !== 'number') {
      return false;
    }
    if (!new Date(data.releasedDate).getTime() > 0) {
      return false;
    }
  }

  return true;
};

module.exports = validateBook;

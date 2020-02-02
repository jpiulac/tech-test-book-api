const errorResponse = (code, message) => ({
  statusCode: code || 500,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    error: true,
    message,
  }),
});

const response = data => ({
  statusCode: 200,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

module.exports = { errorResponse, response };

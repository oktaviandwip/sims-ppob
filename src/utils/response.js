// Response
function response(res, status, message, data = null) {
  const result = {
    status,
    message,
    data,
  };
  res.json(result);
}

module.exports = response;

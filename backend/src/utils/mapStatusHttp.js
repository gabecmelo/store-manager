const httpMap = {
  SUCCESSFULL: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  INVALID_VALUE: 400,
  NOT_FOUND_VALUE: 422,
};

const mapStatusHttp = (status) => httpMap[status] || 500;

module.exports = {
  mapStatusHttp,
};

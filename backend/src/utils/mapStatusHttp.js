const httpMap = {
  SUCCESSFULL: 200,
  NOT_FOUND: 404,
  CREATED: 201,
};

const mapStatusHttp = (status) => httpMap[status] || 500;

module.exports = {
  mapStatusHttp,
};

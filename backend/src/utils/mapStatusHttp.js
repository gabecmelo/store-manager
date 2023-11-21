const httpMap = {
  SUCCESSFULL: 200,
};

const mapStatusHttp = (status) => httpMap[status] || 500;

module.exports = {
  mapStatusHttp,
};

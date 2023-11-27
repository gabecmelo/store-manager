const sinon = require('sinon');
const chai = require('chai');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { salesFromModel, saleFromModel } = require('../mocks/sales.mock');
const { httpMockMap } = require('../mocks');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes - SALES SERVICES', function () {
  it('Recupera todos as sales com sucesso', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromModel);

    const responseData = [
      { saleId: 1, date: '2023-11-23 14:00:14', productId: '1', quantity: 5 },
      { saleId: 2, date: '2023-06-22 11:30:34', productId: '2', quantity: 15 },
    ];

    const serviceResponse = await salesService.getSales();
    expect(serviceResponse.status).to.equal(httpMockMap.SUCCESSFULL);
    expect(serviceResponse.data).to.deep.equal(responseData);
  });
  it('Recupera a sale pelo id com sucesso', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);

    const requestId = 1;
    const responseData = [
      { date: '2023-11-23 18:18:18', productId: '1', quantity: 7 },
      { date: '2023-11-23 18:18:18', productId: '2', quantity: 3 },
    ];

    const serviceResponse = await salesService.getSale(requestId);
    expect(serviceResponse.status).to.equal(httpMockMap.SUCCESSFULL);
    expect(serviceResponse.data).to.deep.equal(responseData);
  });
  it('Não recupera o sale com id incorreto', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const requestId = 404;
    const responseErrorData = { message: 'Sale not found' };

    const serviceResponse = await salesService.getSale(requestId);
    expect(serviceResponse.status).to.equal(httpMockMap.NOT_FOUND);
    expect(serviceResponse.data).to.deep.equal(responseErrorData);
  });

  afterEach(function () {
    sinon.restore();
  });
});

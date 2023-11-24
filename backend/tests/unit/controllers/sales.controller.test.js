const sinon = require('sinon');
const chai = require('chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const {
  salesFromModel,
  salesRecoveredFromService,
  saleRecoveredFromService,
  saleFromModel,
} = require('../mocks/sales.mock');
const { saleNotFoundMessage, saleNotRecoveredFromService } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes - SALES CONTROLLERS:', function () {
  it('Recuperando todos os produtos com sucesso - status 200', async function () {
    sinon
      .stub(salesService, 'getSales')
      .resolves(salesRecoveredFromService);

    const req = {
      body: 'nothing here',
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });
  it('Recuperando o produto especifico com sucesso - status 200', async function () {
    sinon
      .stub(salesService, 'getSale')
      .resolves(saleRecoveredFromService);

    const req = {
      params: { id: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });
  it('Não recupera a sale pelo id com sucesso - status 404', async function () {
    sinon
      .stub(salesService, 'getSale')
      .resolves(saleNotRecoveredFromService);

    const req = {
      params: { id: 404 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(saleNotFoundMessage);
  });

  afterEach(function () {
    sinon.restore();
  });
});

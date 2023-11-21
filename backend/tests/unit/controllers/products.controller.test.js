const sinon = require('sinon');
const chai = require('chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const {
  productsFromModel,
  productsRecoveredFromService,
} = require('../mocks/products.mock');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes - PRODUCT CONTROLLERS:', function () {
  it('Recuperando todos os produtos com sucesso - status 200', async function () {
    sinon
      .stub(productsService, 'getProducts')
      .resolves(productsRecoveredFromService);

    const req = {
      body: 'nothing here',
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});

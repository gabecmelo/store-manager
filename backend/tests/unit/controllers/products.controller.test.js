const sinon = require('sinon');
const chai = require('chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const {
  productsFromModel,
  productsRecoveredFromService,
  productRecoveredFromService,
  productFromModel,
} = require('../mocks/products.mock');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes - PRODUCTS CONTROLLERS:', function () {
  it('Recuperando todos os products com sucesso - status 200', async function () {
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
  it('Recuperando o product especifico com sucesso - status 200', async function () {
    sinon
      .stub(productsService, 'getProduct')
      .resolves(productRecoveredFromService);

    const req = {
      params: { id: 42 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  // IMPLEMENTAR TESTE DE NÃO ENCONTRADO

  afterEach(function () {
    sinon.restore();
  });
});

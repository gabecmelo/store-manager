const sinon = require('sinon');
const chai = require('chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const {
  productsFromModel,
  productsRecoveredFromService,
  productRecoveredFromService,
  productFromModel,
  productNotRecoveredFromService,
  productNotFoundMessage,
  insertedProductFromService,
  productServiceErrors,
  errorsMessages,
  modifiedProductFromModel,
  modifiedProductFromService,
  deletedProductFromService,
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
  it('Não recupera o product pelo id com sucesso - status 404', async function () {
    sinon
      .stub(productsService, 'getProduct')
      .resolves(productNotRecoveredFromService);

    const req = {
      params: { id: 404 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productNotFoundMessage);
  });
  it('Insere o product com sucesso - status 201', async function () {
    sinon
      .stub(productsService, 'insertNewProduct')
      .resolves(insertedProductFromService);

    sinon
      .stub(productsService, 'getProduct')
      .resolves(productRecoveredFromService);

    const req = {
      body: { name: 'New product' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.registerNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });
  it('Não insere o product com chave incorreta - status 400', async function () {
    sinon
      .stub(productsService, 'insertNewProduct')
      .resolves(productServiceErrors.invalidValue);

    const req = {
      body: {},
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.registerNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: errorsMessages.invalidValue,
    });
  });
  it('Modifica o produto corretamente - status 200', async function () {
    sinon
      .stub(productsService, 'modifyProduct')
      .resolves(modifiedProductFromService);

    const req = {
      params: { id: 42 },
      body: { name: 'Modified product' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.modifyProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(modifiedProductFromModel);
  });
  it('Deleta o produto corretamente - status 204', async function () {
    sinon
      .stub(productsService, 'deleteProduct')
      .resolves(deletedProductFromService);

    const req = {
      params: { id: 42 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });

  afterEach(function () {
    sinon.restore();
  });
});

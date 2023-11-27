const sinon = require('sinon');
const chai = require('chai');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const {
  productsFromModel,
  productFromModel,
  productIdFromModel,
} = require('../mocks/products.mock');
const { httpMockMap } = require('../mocks');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes - PRODUCTS SERVICES', function () {
  it('Recupera todos os products com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);

    const responseData = [
      { id: 1, name: 'New product' },
      { id: 2, name: 'New product' },
    ];

    const serviceResponse = await productsService.getProducts();
    expect(serviceResponse.status).to.equal(httpMockMap.SUCCESSFULL);
    expect(serviceResponse.data).to.deep.equal(responseData);
  });
  it('Recupera o product pelo id com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);

    const requestId = 42;
    const responseData = {
      id: 42,
      name: 'New product',
    };

    const serviceResponse = await productsService.getProduct(requestId);
    expect(serviceResponse.status).to.equal(httpMockMap.SUCCESSFULL);
    expect(serviceResponse.data).to.deep.equal(responseData);
  });
  it('Não recupera o product com id incorreto', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const requestId = 404;
    const responseErrorData = { message: 'Product not found' };

    const serviceResponse = await productsService.getProduct(requestId);
    expect(serviceResponse.status).to.equal(httpMockMap.NOT_FOUND);
    expect(serviceResponse.data).to.deep.equal(responseErrorData);
  });
  it('Insere o product corretamente', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves(productIdFromModel);

    const inputData = {
      name: 'New product',
    };

    const responseData = {
      insertId: 42,
    };

    const serviceResponse = await productsService.insertNewProduct(inputData);
    expect(serviceResponse.status).to.equal(httpMockMap.CREATED);
    expect(serviceResponse.data).to.deep.equal(responseData);
  });

  // COBRIR VALIDATIONS

  afterEach(function () {
    sinon.restore();
  });
});

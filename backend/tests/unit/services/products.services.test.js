const sinon = require('sinon');
const chai = require('chai');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const schema = require('../../../src/services/validations/validateProduct');
const {
  productsFromModel,
  productFromModel,
  productIdFromModel,
  productErrors,
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
  it('[ERRO] product sem chave name', async function () {
    sinon.stub(schema, 'validateProduct').resolves(productErrors.invalidValue);

    const responseErrorData = {
      message: '""name" is required"',
    };

    const serviceErrorResponse = await productsService.insertNewProduct({});

    expect(serviceErrorResponse.status).to.equal(httpMockMap.INVALID_VALUE);
    expect(serviceErrorResponse.data).to.deep.equal(responseErrorData);
  });
  it('[ERRO] product com a chave name menor que 5 caracteres', async function () {
    sinon.stub(schema, 'validateProduct').resolves(productErrors.invalidLength);

    const responseErrorData = {
      message: '"name" length must be at least 5 characters long',
    };

    const serviceErrorResponse = await productsService.insertNewProduct({
      name: 'err',
    });

    expect(serviceErrorResponse.status).to.equal(httpMockMap.UNPROCESSABLE);
    expect(serviceErrorResponse.data).to.deep.equal(responseErrorData);
  });
  it('', async function () {
    sinon.stub(productsModel, 'findAll').resolves([])

    const responseErrorData = {
      message: 'Não há produtos disponíveis'
    }

    const serviceErrorResponse = await productsService.getProducts();
    expect(serviceErrorResponse.status).to.equal(httpMockMap.SUCCESSFULL);
    expect(serviceErrorResponse.data).to.deep.equal(responseErrorData);
  })
  // COBRIR VALIDATIONS

  afterEach(function () {
    sinon.restore();
  });
});

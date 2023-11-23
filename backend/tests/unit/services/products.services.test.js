const sinon = require('sinon');
const chai = require('chai');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const {
  productsFromModel,
  productFromModel,
} = require('../mocks/products.mock');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Realizando testes - PRODUCTS SERVICES', function () {
  it('Recupera todos os products com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);

    const responseData = [
      { id: 1, name: 'name' },
      { id: 2, name: 'name' },
    ];

    const serviceResponse = await productsService.getProducts();
    expect(serviceResponse.status).to.equal('SUCCESSFULL');
    expect(serviceResponse.data).to.deep.equal(responseData);
  });
  it('Recupera o product pelo id com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);

    const requestId = 42;
    const responseData = {
      id: 42,
      name: 'name',
    };

    const serviceResponse = await productsService.getProduct(requestId);
    expect(serviceResponse.status).to.equal('SUCCESSFULL');
    expect(serviceResponse.data).to.deep.equal(responseData);
  });

  // IMPLEMENTAR TESTE DE NÃO ENCONTRADO

  afterEach(function () {
    sinon.restore();
  });
});
